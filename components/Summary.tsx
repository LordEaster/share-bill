"use client";

import React from "react";
import { Friend, DebtCalculation } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { ArrowRight, Calculator } from "lucide-react";

interface SummaryProps {
  friends: Friend[];
  debts: DebtCalculation[];
  calculateShare: (id: string) => number;
}

export function Summary({ friends, debts, calculateShare }: SummaryProps) {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Individual Balances</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {friends.map((friend) => {
                const balance = -calculateShare(friend.id);
                return (
                  <div
                    key={friend.id}
                    className="p-3 rounded-lg bg-muted flex justify-between items-center"
                  >
                    <span className="font-medium">{friend.name}</span>
                    <span
                      className={
                        balance > 0
                          ? "text-green-600 dark:text-green-400"
                          : balance < 0
                          ? "text-red-600 dark:text-red-400"
                          : ""
                      }
                    >
                      {balance.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Payment Summary</h3>
            <ScrollArea className="h-[200px] pr-4">
              {debts.map((debt, index) => {
                const fromFriend = friends.find((f) => f.id === debt.from);
                const toFriend = friends.find((f) => f.id === debt.to);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{fromFriend?.name}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span className="font-medium">{toFriend?.name}</span>
                    </div>
                    <span>{debt.amount.toFixed(2)}</span>
                  </div>
                );
              })}
              {debts.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No payments needed
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}