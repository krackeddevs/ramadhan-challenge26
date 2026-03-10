"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamMembersInputProps {
    value: string[];
    onChange: (value: string[]) => void;
}

export function TeamMembersInput({ value, onChange }: TeamMembersInputProps) {
    const [inputValue, setInputValue] = React.useState("");

    const handleAdd = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = inputValue.trim();
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleRemove = (memberToRemove: string) => {
        onChange(value.filter((member) => member !== memberToRemove));
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <Input
                    placeholder="Add team member name..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-[#111111] border-[#222222] text-white focus-visible:ring-primary focus-visible:border-primary"
                />
                <Button
                    type="button"
                    onClick={handleAdd}
                    variant="secondary"
                    className="shrink-0 bg-[#222222] text-white hover:bg-[#333333]"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </div>

            {value.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {value.map((member) => (
                        <Badge
                            key={member}
                            variant="secondary"
                            className="bg-[#1a1a1a] text-gray-200 border border-[#333333] px-3 py-1 flex items-center gap-1"
                        >
                            {member}
                            <button
                                type="button"
                                onClick={() => handleRemove(member)}
                                className="ml-1 rounded-full p-0.5 hover:bg-[#333333] text-gray-400 hover:text-white transition-colors"
                                aria-label={`Remove ${member}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
