"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminDataStore } from "@/lib/admin/data-store";
import { CATEGORIES } from "@/lib/data/categories";
import { Trash2, Save, Check } from "lucide-react";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || crypto.randomUUID();

const categoryNameMap = Object.fromEntries(CATEGORIES.map((cat) => [cat.id, cat.name]));

const DEFAULT_FORM = {
  id: "",
  name: "",
  categoryIds: [CATEGORIES[0]?.id || "supermarket"],
  aliases: "",
  logo: "",
  accentColor: "#16a34a",
  isOnlineOnly: false,
};

export default function AdminMerchantsPage() {
  const { merchants, addOrUpdateMerchant, removeMerchant } = useAdminDataStore();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedMerchants = useMemo(
    () => [...merchants].sort((a, b) => a.name.localeCompare(b.name)),
    [merchants]
  );

  const handleEdit = (id: string) => {
    const merchant = merchants.find((m) => m.id === id);
    if (!merchant) return;
    setEditingId(id);
    setForm({
      id: merchant.id,
      name: merchant.name,
      categoryIds: merchant.categoryIds,
      aliases: merchant.aliases ? merchant.aliases.join(", ") : "",
      logo: merchant.logo || "",
      accentColor: merchant.accentColor || "#16a34a",
      isOnlineOnly: merchant.isOnlineOnly || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(DEFAULT_FORM);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      id: editingId || slugify(form.name),
      name: form.name,
      categoryIds: form.categoryIds,
      aliases: form.aliases.split(",").map((alias) => alias.trim()).filter(Boolean),
      logo: form.logo || undefined,
      accentColor: form.accentColor || undefined,
      isOnlineOnly: form.isOnlineOnly,
    };
    addOrUpdateMerchant(payload);
    resetForm();
  };

  const toggleCategory = (catId: string) => {
    setForm((prev) => {
      const current = prev.categoryIds;
      if (current.includes(catId)) {
        return { ...prev, categoryIds: current.filter((id) => id !== catId) };
      } else {
        return { ...prev, categoryIds: [...current, catId] };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-6 flex-col lg:flex-row">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">商戶資料</h1>
          <p className="text-gray-500 dark:text-gray-400">調整信用卡回贈計算機所使用的常見商戶列表。</p>
        </div>
        <Card className="w-full lg:w-96 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">
              {editingId ? "編輯商戶" : "新增商戶"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">商戶名稱</label>
                <Input
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">分類 (可多選)</label>
                <div className="flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border dark:border-gray-700">
                  {CATEGORIES.map((cat) => {
                    const isSelected = form.categoryIds.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`text-xs px-2 py-1 rounded-full border transition-colors flex items-center gap-1 ${
                          isSelected
                            ? "bg-blue-100 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3" />}
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
                {form.categoryIds.length === 0 && (
                    <p className="text-xs text-red-500 mt-1">請至少選擇一個分類</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">別名 (逗號分隔)</label>
                <Input
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                  value={form.aliases}
                  onChange={(e) => setForm((prev) => ({ ...prev, aliases: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">圖示/Emoji</label>
                  <Input
                    className="mt-1 dark:bg-gray-700 dark:border-gray-600"
                    value={form.logo}
                    onChange={(e) => setForm((prev) => ({ ...prev, logo: e.target.value }))}
                    placeholder="例：🛒"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">品牌色</label>
                  <Input
                    type="color"
                    className="mt-1 h-10 p-1 dark:bg-gray-700 dark:border-gray-600"
                    value={form.accentColor}
                    onChange={(e) => setForm((prev) => ({ ...prev, accentColor: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">商戶性質</label>
                  <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                          <input 
                              type="radio" 
                              name="merchantType"
                              checked={!form.isOnlineOnly}
                              onChange={() => setForm(prev => ({ ...prev, isOnlineOnly: false }))}
                              className="w-4 h-4 text-blue-600"
                          />
                          實體/網上通用
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                          <input 
                              type="radio" 
                              name="merchantType"
                              checked={form.isOnlineOnly}
                              onChange={() => setForm(prev => ({ ...prev, isOnlineOnly: true }))}
                              className="w-4 h-4 text-blue-600"
                          />
                          純網上 (Online Only)
                      </label>
                  </div>
              </div>

              <div className="flex justify-between gap-2">
                {editingId ? (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    取消編輯
                  </Button>
                ) : (
                  <div />
                )}
                <Button type="submit" className="gap-2" disabled={form.categoryIds.length === 0}>
                  <Save className="h-4 w-4" /> {editingId ? "儲存商戶" : "新增商戶"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">商戶</th>
              <th className="px-6 py-4 font-medium">分類</th>
              <th className="px-6 py-4 font-medium">性質</th>
              <th className="px-6 py-4 font-medium">別名</th>
              <th className="px-6 py-4 font-medium text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {sortedMerchants.map((merchant) => (
              <tr key={merchant.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{
                        backgroundColor: `${merchant.accentColor || "#e5e7eb"}20`,
                        color: merchant.accentColor || "#111827",
                      }}
                    >
                      {merchant.logo || merchant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{merchant.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{merchant.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {merchant.categoryIds.map((catId) => (
                        <span key={catId} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs">
                            {categoryNameMap[catId] || catId}
                        </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                    {merchant.isOnlineOnly ? (
                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-0.5 rounded text-xs font-medium">純網上</span>
                    ) : (
                        <span className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 px-2 py-0.5 rounded text-xs">通用</span>
                    )}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                  {merchant.aliases && merchant.aliases.length > 0 ? merchant.aliases.join(", ") : "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(merchant.id)}>
                      編輯
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        if (confirm(`確定刪除 ${merchant.name}？`)) {
                          removeMerchant(merchant.id);
                          if (editingId === merchant.id) resetForm();
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
