"use client";

import React from "react";
import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ShareButtonProps {
  sessionId: string; // Pass sessionId as a prop
}

export function ShareButton({ sessionId }: ShareButtonProps) {
    const handleShare = async () => {
        const shareableUrl = `${window.location.origin}?sessionId=${sessionId}`;

        try {
        if (navigator.share) {
            await navigator.share({
            title: "Split the Bill",
            text: "Check out our shared bill splitting details",
            url: shareableUrl,
            });
        } else {
            await navigator.clipboard.writeText(shareableUrl);
            toast.success("Share link copied to clipboard!");
        }
        } catch (error) {
        toast.error("Failed to share. Please try again.");
        }
    };

    return (
        <Button onClick={handleShare} variant="outline" className="gap-2">
        <Share2 className="h-4 w-4" />
        Share
        </Button>
    );
}