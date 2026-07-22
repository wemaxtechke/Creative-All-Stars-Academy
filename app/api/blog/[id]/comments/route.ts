import { NextResponse } from 'next/server';
import { createBlogComment, listBlogComments } from '@/lib/db/blog-comments';
import { parseJsonBytes, readBoundedBody } from '@/lib/security/request-body';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstile } from '@/lib/security/turnstile';

export const dynamic = 'force-dynamic';

function clean(value: unknown, max: number) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function response(data: unknown, init?: ResponseInit) {
  const result = NextResponse.json(data, init);
  result.headers.set('cache-control', 'no-store');
  return result;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const postId = clean((await params).id, 100);
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(postId)) return response({ error: 'Invalid article.' }, { status: 400 });
  return response({ comments: await listBlogComments(postId) });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const postId = clean((await params).id, 100);
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(postId)) return response({ error: 'Invalid article.' }, { status: 400 });
  const body = await readBoundedBody(request, 16_000);
  if (!body.ok) return response({ error: 'Comment submission is too large.' }, { status: 413 });
  const input = parseJsonBytes(body.bytes);
  if (!input) return response({ error: 'Invalid comment submission.' }, { status: 400 });
  if (clean(input.company, 100)) return response({ ok: true }, { status: 201 });
  if (!await checkRateLimit(request, 'blog-comment', 5, 600)) {
    return response({ error: 'Too many comments. Please wait before trying again.' }, { status: 429 });
  }
  if (!await verifyTurnstile(request, clean(input.turnstileToken, 2048), 'turnstile-spin-v2')) {
    return response({ error: 'Please complete the security check and try again.' }, { status: 403 });
  }
  const name = clean(input.name, 80);
  const message = clean(input.message, 2_000);
  if (name.length < 2) return response({ error: 'Enter your full name.' }, { status: 400 });
  if (message.length < 3) return response({ error: 'Write a longer comment.' }, { status: 400 });
  const comment = await createBlogComment(postId, name, message);
  return comment
    ? response({ comment }, { status: 201 })
    : response({ error: 'This article is not available.' }, { status: 404 });
}
