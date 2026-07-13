'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/AppContext';
import { Mail, Trash, Check, Archive, Eye } from 'lucide-react';

export default function AdminMessages() {
  const { messages, updateMessageStatus } = useApp();
  const [activeTab, setActiveTab] = useState<'Unread' | 'Read' | 'Archived'>('Unread');
  const [selectedMsg, setSelectedMsg] = useState<typeof messages[0] | null>(null);

  const filteredMsgs = messages.filter(m => m.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Contact Messages Inbox</h1>
        <p className="text-gray-500 text-xs">Read and respond to dynamic customer/parent inquiry emails registered on our Contact form.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100 pb-3">
        {(['Unread', 'Read', 'Archived'] as const).map((tab) => {
          const count = messages.filter(m => m.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedMsg(null);
              }}
              className={`px-4 py-2 text-xs font-black rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab} Messages ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Table column */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto text-left">
            <table className="w-full text-xs font-semibold text-gray-700">
              <thead>
                <tr className="bg-gray-100/50 text-blue-950 font-extrabold uppercase border-b border-gray-100">
                  <th className="p-4">Sender Profile</th>
                  <th className="p-4">Inquiry Subject</th>
                  <th className="p-4">Received Date</th>
                  <th className="p-4 text-center">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredMsgs.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-extrabold text-blue-950">{msg.name}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">{msg.email}</p>
                    </td>
                    <td className="p-4 font-bold text-gray-600 truncate max-w-[180px]">{msg.subject}</td>
                    <td className="p-4 text-gray-500">{msg.dateSubmitted}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedMsg(msg)}
                        className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Read message content"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMsgs.length === 0 && (
            <div className="text-center py-12 text-gray-400 font-medium">No messages registered under &ldquo;{activeTab}&rdquo; folder.</div>
          )}
        </div>

        {/* Selected Inspect Column */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-gray-100 rounded-3xl shadow-xs space-y-6">
          <h3 className="text-lg font-black text-blue-950 border-b border-gray-50 pb-2">Read Message Details</h3>

          {selectedMsg ? (
            <div className="space-y-6 text-xs font-semibold">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 leading-normal space-y-2">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Sender Contacts</span>
                <h4 className="font-extrabold text-sm text-blue-950">{selectedMsg.name}</h4>
                <p className="text-gray-500">Email: {selectedMsg.email}</p>
                {selectedMsg.phone && <p className="text-gray-500">Phone: {selectedMsg.phone}</p>}
                <p className="text-gray-400 font-bold">Sent on: {selectedMsg.dateSubmitted}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 leading-relaxed space-y-2">
                <span className="text-[10px] text-gray-400 font-bold block uppercase">Inquiry content</span>
                <p className="font-extrabold text-blue-900 mb-2">Subject: {selectedMsg.subject}</p>
                <p className="text-gray-600 font-medium italic">&ldquo;{selectedMsg.message}&rdquo;</p>
              </div>

              {/* Action buttons */}
              <div className="border-t border-gray-50 pt-4 flex gap-2">
                {selectedMsg.status === 'Unread' && (
                  <button
                    onClick={() => {
                      updateMessageStatus(selectedMsg.id, 'Read');
                      setSelectedMsg(null);
                    }}
                    className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Mark as Read
                  </button>
                )}
                {selectedMsg.status === 'Read' && (
                  <button
                    onClick={() => {
                      updateMessageStatus(selectedMsg.id, 'Archived');
                      setSelectedMsg(null);
                    }}
                    className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-extrabold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Archive className="w-4 h-4" /> Move to Archive
                  </button>
                )}
                {selectedMsg.status === 'Archived' && (
                  <span className="text-center w-full py-3.5 bg-gray-100 border text-gray-400 font-bold rounded-xl">This message is safely archived.</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 font-medium text-xs leading-normal">Inspect any incoming parental inboxes by clicking the Inspect Eyeball button in left rows to reply, evaluate, or archive.</p>
          )}
        </div>

      </div>
    </div>
  );
}
