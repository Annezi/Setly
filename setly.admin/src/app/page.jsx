"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import useAdminGuard from "@/lib/useAdminGuard";
import { fetchAnalytics } from "@/lib/api";

const STAT_CONFIGS = [
  {
    key: "total_users",
    label: "Всего пользователей",
    color: "#1a73e8",
    bg: "#e8f0fe",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "admin_users",
    label: "Администраторов",
    color: "#7c3aed",
    bg: "#ede9fe",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    key: "blocked_users",
    label: "Заблокированных",
    color: "#e53e3e",
    bg: "#fff5f5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    key: "total_checkplans",
    label: "Чек-планов",
    color: "#38a169",
    bg: "#f0fff4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    key: "pending_moderation",
    label: "На модерации",
    color: "#d69e2e",
    bg: "#fffff0",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

function StatCard({ config, value, loading }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "var(--radius-lg)",
        padding: "24px",
        boxShadow: "var(--shadow-sm)",
        border: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
        transition: "box-shadow 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-md)",
          background: config.bg,
          color: config.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {config.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            fontWeight: 500,
            marginBottom: 6,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {config.label}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: loading ? "var(--color-border)" : config.color,
            lineHeight: 1,
            transition: "color 0.2s",
          }}
        >
          {loading ? "—" : (value ?? 0).toLocaleString("ru-RU")}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { loading: authLoading } = useAdminGuard();
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    fetchAnalytics()
      .then((data) => {
        setAnalytics(data);
        setDataLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setDataLoading(false);
      });
  }, [authLoading]);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)" }}>
        <div style={{ textAlign: "center", color: "var(--color-text-secondary)" }}>
          <div style={{ fontSize: 16 }}>Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1200 }}>
        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
            Дашборд
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
            Общая статистика платформы Setly
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "#fff5f5",
              border: "1px solid #fed7d7",
              borderRadius: "var(--radius-md)",
              color: "var(--color-danger)",
              marginBottom: 24,
              fontSize: 14,
            }}
          >
            Ошибка загрузки: {error}
          </div>
        )}

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {STAT_CONFIGS.map((cfg) => (
            <StatCard
              key={cfg.key}
              config={cfg}
              value={analytics?.[cfg.key]}
              loading={dataLoading}
            />
          ))}
        </div>

        {/* Quick actions */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 16, color: "var(--color-text)" }}>
            Быстрые действия
          </h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { href: "/users", label: "Управление пользователями", color: "#1a73e8", bg: "#e8f0fe" },
              { href: "/content", label: "Модерация контента", color: "#d69e2e", bg: "#fffff0" },
              { href: "/settings", label: "Настройки платформы", color: "#38a169", bg: "#f0fff4" },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 18px",
                  background: action.bg,
                  color: action.color,
                  borderRadius: "var(--radius-md)",
                  fontSize: 13,
                  fontWeight: 600,
                  border: `1px solid ${action.color}22`,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
