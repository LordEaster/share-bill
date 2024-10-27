"use client";

import React, { useState } from "react";
import { Friend, OrderItem } from "@/types";
import { Plus, Trash2, Receipt } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface OrdersListProps {
  orders: OrderItem[];
  friends: Friend[];
  onAddOrder: (description: string, amount: number, paidBy: string) => void;
  onDeleteOrder: (id: string) => void;
  onToggleFriendAssignment: (orderId: string, friendId: string) => void;
}

export function OrdersList({
  orders,
  friends,
  onAddOrder,
  onDeleteOrder,
  onToggleFriendAssignment,
}: OrdersListProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const handleAddOrder = () => {
    if (description && amount && paidBy) {
      onAddOrder(description, parseFloat(amount), paidBy);
      setDescription("");
      setAmount("");
      setPaidBy("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
            />
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger>
                <SelectValue placeholder="Paid by" />
              </SelectTrigger>
              <SelectContent>
                {friends.map((friend) => (
                  <SelectItem key={friend.id} value={friend.id}>
                    {friend.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleAddOrder}>
              <Plus className="h-4 w-4 mr-2" /> Add Order
            </Button>
          </div>
          <ScrollArea className="h-[300px] pr-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col p-4 rounded-lg bg-card mb-2 border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">{order.description}</h3>
                    <p className="text-sm text-muted-foreground">
                      Amount: {order.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Paid by: {friends.find((f) => f.id === order.paidBy)?.name}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteOrder(order.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Split between:</p>
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${order.id}-${friend.id}`}
                        checked={order.assignedTo.includes(friend.id)}
                        onCheckedChange={() =>
                          onToggleFriendAssignment(order.id, friend.id)
                        }
                      />
                      <label
                        htmlFor={`${order.id}-${friend.id}`}
                        className="text-sm"
                      >
                        {friend.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}