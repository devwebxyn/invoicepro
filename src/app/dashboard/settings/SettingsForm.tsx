// src/app/dashboard/settings/SettingsForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function SettingsForm({ profile }: { profile: any }) {
  const [name, setName] = useState(profile?.display_name || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: Implementasi logic update profil
    await new Promise((res) => setTimeout(res, 800));
    toast.success("Profil berhasil diperbarui!");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="name">Nama Tampilan</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={profile?.email || ""} disabled />
      </div>

      <div className="pt-2">
        <Button disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}