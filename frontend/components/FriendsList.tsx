"use client";

import React, { useState } from "react";
import { Friend } from "../types";
import { Plus, Trash2, Users, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { toast } from "sonner";

interface FriendsListProps {
  friends: Friend[];
  onAddFriend: (name: string, paymentAddress?: string) => void;
  onDeleteFriend: (id: string) => void;
  onTogglePaid: (id: string) => void;
  onUpdatePaymentAddress: (id: string, address: string) => void;
  calculateShare: (id: string) => number;
}

export function FriendsList({
  friends,
  onAddFriend,
  onDeleteFriend,
  onTogglePaid,
  onUpdatePaymentAddress,
  calculateShare,
}: FriendsListProps) {
  const [newFriend, setNewFriend] = useState("");
  const [newPaymentAddress, setNewPaymentAddress] = useState("");

  const handleAddFriend = () => {
    if (newFriend.trim()) {
      onAddFriend(newFriend, newPaymentAddress);
      setNewFriend("");
      setNewPaymentAddress("");
    }
  };

  const copyPaymentAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Payment address copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        <h2 className="font-bold text-lg">Friends</h2>
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Friend's name"
          value={newFriend}
          onChange={(e) => setNewFriend(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddFriend()}
        />
        <Input
          placeholder="Payment address (optional)"
          value={newPaymentAddress}
          onChange={(e) => setNewPaymentAddress(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddFriend()}
        />
        <Button onClick={handleAddFriend}>
          <Plus className="h-4 w-4 mr-2" /> Add Friend
        </Button>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50 mb-2 shadow-sm"
          >
            <div className="space-y-1">
              <span className="font-medium">{friend.name}</span>
              <div className="text-sm text-muted-foreground">
                Balance: {calculateShare(friend.id).toFixed(2)}
              </div>
              {friend.paymentAddress && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="truncate max-w-[150px]">
                    {friend.paymentAddress}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyPaymentAddress(friend.paymentAddress!)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Edit Address
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Payment Address</h4>
                    <Input
                      placeholder="Enter payment address"
                      defaultValue={friend.paymentAddress}
                      onChange={(e) =>
                        onUpdatePaymentAddress(friend.id, e.target.value)
                      }
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Badge
                variant={friend.paid ? "default" : "secondary"}
                className="cursor-pointer"
                onClick={() => onTogglePaid(friend.id)}
              >
                {friend.paid ? "Paid" : "Unpaid"}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteFriend(friend.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}