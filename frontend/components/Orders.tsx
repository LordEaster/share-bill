"use client";

import React, { useState } from "react";
import { Friend, OrderItem } from "../types";
import { Plus, Trash2, Receipt } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer";

interface OrdersListProps {
  orders: OrderItem[];
  friends: Friend[];
  onAddOrder: (description: string, amount: number, paidBy: string) => void;
  onDeleteOrder: (id: string) => void;
  onToggleFriendAssignment: (orderId: string, friendId: string) => void;
}

export function Orders({
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

const AddOrderForm = (
  <div className="h-full mt-4 flex flex-col justify-between">
    <div className="space-y-4 mb-6">
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

      {/* Paid By Radio Group */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Paid by:</p>
        <div className="grid grid-cols-2 gap-2">
          {friends.map((friend) => (
            <label
              key={friend.id}
              className={`flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer ${
                paidBy === friend.id
                  ? "border-orange-500 bg-orange-50"
                  : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paidBy"
                value={friend.id}
                checked={paidBy === friend.id}
                onChange={() => setPaidBy(friend.id)}
                className="accent-orange-500"
              />
              <span className="text-sm">{friend.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* Submit Button */}
    <Button
      onClick={handleAddOrder}
      className="w-full flex items-center justify-center"
    >
      <Plus className="h-4 w-4 mr-2" /> Add Order
    </Button>
  </div>
);


  return (
    <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Orders
          </div>

          {/* Desktop: Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                Add Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">{AddOrderForm}</DialogContent>
          </Dialog>

          {/* Mobile: Drawer Trigger */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="md:hidden">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 h-4/5">{AddOrderForm}</DrawerContent>
          </Drawer>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Orders List */}
      <ScrollArea className="h-[300px] pr-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col p-4 rounded-lg bg-gray-50 mb-2 border"
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
              <p className="text-sm font-medium">Share with:</p>
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
    </CardContent>
    </Card>
  );
}
