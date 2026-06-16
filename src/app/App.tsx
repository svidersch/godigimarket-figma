// GoDigiMarket — Design System & UI Showcase

import { useState, useMemo, createContext, useContext } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  LayoutDashboard, Users, FileText, Package, DollarSign, Settings,
  Search, Bell, ChevronRight, MoreHorizontal, ArrowUpRight,
  ArrowDownRight, Eye, Edit, Trash2, Download, Upload, CheckCircle,
  XCircle, AlertCircle, Clock, Shield, Bookmark, Camera, Wallet,
  CreditCard, Activity, TrendingUp, Calendar, Plus, LogOut, RefreshCw,
  Info, Newspaper, ArrowRight, Truck, MessageSquare, Globe, AlertTriangle,
  Filter, Layers, Inbox, Zap, List, Grid, SortAsc, ChevronLeft,
  Mail, Tag, Hash, Code, Send, ExternalLink, Copy, Lock,
  UserCheck, Radio, Database, Server, BarChart2, Menu, X as XIcon,
  Terminal, BookOpen, Star, Monitor, Smartphone, Tablet,
  ChevronUp, ChevronDown, ChevronsUpDown, MapPin,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";

// ── Utility ────────────────────────────────────────────────────────────────────
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Mobile sidebar context ─────────────────────────────────────────────────────
const MobileMenuCtx = createContext<{ open: boolean; toggle: () => void; close: () => void }>({
  open: false, toggle: () => {}, close: () => {},
});

// ── Types ──────────────────────────────────────────────────────────────────────
type Role = "admin" | "reporter" | "customer" | "public";

type Screen =
  | "design-system"
  | "login" | "register" | "reset-password"
  | "marketplace" | "articles-list" | "article-detail" | "cms-page"
  | "reporters-map" | "reporter-profile" | "reporter-portfolio"
  | "reportages-map" | "reportage-detail"
  | "requests-map" | "request-detail" | "feeds-map"
  | "admin-dashboard" | "admin-users" | "admin-transactions"
  | "admin-reportages" | "admin-deliveries" | "admin-requests"
  | "admin-disputes" | "admin-settings"
  | "admin-notifications" | "admin-transaction-detail" | "admin-wallet-detail"
  | "admin-platform-earnings" | "admin-user-activity" | "admin-withdrawals"
  | "admin-order-detail"
  | "admin-error-inbox" | "admin-logging-errors"
  | "admin-feeds" | "admin-feed-sources" | "admin-feed-source-entries" | "admin-feed-entry-detail"
  | "admin-taxonomy-list" | "admin-taxonomy-new"
  | "admin-user-detail" | "admin-user-new" | "admin-user-edit"
  | "admin-reporters-list" | "admin-reporter-detail"
  | "admin-subscriptions" | "admin-devices"
  | "admin-reportage-detail"
  | "admin-cms-settings" | "admin-cms-settings-history"
  | "admin-cms-articles" | "admin-cms-article-new" | "admin-cms-article-edit" | "admin-cms-article-detail"
  | "admin-cms-pages" | "admin-cms-page-new" | "admin-cms-page-edit" | "admin-cms-page-detail"
  | "admin-cms-menus" | "admin-cms-menu-items"
  | "admin-newsletters" | "admin-newsletter-new" | "admin-newsletter-detail" | "admin-newsletter-edit"
  | "admin-request-detail"
  | "admin-dispute-detail"
  | "reporter-dashboard" | "reporter-reportages" | "reporter-earnings"
  | "reporter-deliveries" | "reporter-requests" | "reporter-request-responses"
  | "reporter-devices" | "reporter-profile-edit"
  | "reporter-portfolio-photo" | "reporter-portfolio-video" | "reporter-portfolio-audio"
  | "create-reportage"
  | "customer-dashboard" | "customer-purchases" | "customer-requests"
  | "customer-deliveries"
  | "wallet" | "delivery-detail"
  | "subscription-plans" | "registered-dashboard" | "bookmarks"
  | "notifications-list" | "notification-detail" | "notification-preferences"
  | "user-profile" | "my-content-list" | "my-content-detail";

type TxStatus = "completed" | "pending" | "failed" | "processing" | "refunded";
type UserStatus = "active" | "suspended" | "pending" | "banned";
type ReportageStatus = "draft" | "submitted" | "reviewing" | "approved" | "delivered" | "rejected";
type DeliveryStatus = "pending" | "scanning" | "ready" | "downloaded" | "expired" | "failed";
type AvScan = "clean" | "scanning" | "infected";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const REVENUE_DATA = [
  { month: "Jun", revenue: 12400, withdrawals: 8200 },
  { month: "Jul", revenue: 15800, withdrawals: 9100 },
  { month: "Aug", revenue: 14200, withdrawals: 10500 },
  { month: "Sep", revenue: 18900, withdrawals: 11800 },
  { month: "Oct", revenue: 17300, withdrawals: 12400 },
  { month: "Nov", revenue: 21500, withdrawals: 13900 },
  { month: "Dec", revenue: 19800, withdrawals: 14200 },
  { month: "Jan", revenue: 23400, withdrawals: 15100 },
  { month: "Feb", revenue: 26200, withdrawals: 16800 },
  { month: "Mar", revenue: 24100, withdrawals: 15900 },
  { month: "Apr", revenue: 28700, withdrawals: 17300 },
  { month: "May", revenue: 31200, withdrawals: 18600 },
];

const USER_ACTIVITY = [
  { day: "Mon", signups: 42, purchases: 18 },
  { day: "Tue", signups: 38, purchases: 22 },
  { day: "Wed", signups: 55, purchases: 31 },
  { day: "Thu", signups: 49, purchases: 27 },
  { day: "Fri", signups: 63, purchases: 38 },
  { day: "Sat", signups: 31, purchases: 14 },
  { day: "Sun", signups: 28, purchases: 12 },
];

const REPORTER_EARNINGS_DATA = [
  { month: "Jan", earned: 320 }, { month: "Feb", earned: 480 },
  { month: "Mar", earned: 290 }, { month: "Apr", earned: 610 }, { month: "May", earned: 840 },
];

interface UserRow {
  id: string; name: string; email: string;
  role: "reporter" | "customer" | "admin"; status: UserStatus;
  country: string; joined: string; reportages: number; balance: number;
  phone: string; bio: string; emailVerified: boolean; kycVerified: boolean;
  lastLogin: string; subscription: string | null; totalSpent: number;
  avatar: string;
}
const USERS: UserRow[] = [
  { id: "USR-0021", name: "Elena Marchetti",  email: "e.marchetti@medialab.it",   role: "reporter",  status: "active",    country: "Italy",       joined: "2025-09-14", reportages: 47, balance: 2840.50, phone: "+39 02 8734 5512", bio: "Senior video journalist covering European politics and culture. Previously at RAI News24.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-24 07:12", subscription: null,       totalSpent: 0,       avatar: "https://i.pravatar.cc/80?img=47" },
  { id: "USR-0022", name: "Daniyar Seitkali", email: "d.seitkali@kazpres.kz",    role: "reporter",  status: "active",    country: "Kazakhstan",  joined: "2025-10-02", reportages: 31, balance: 1920.00, phone: "+7 717 234 5678",  bio: "Field reporter specialising in Central Asia — conflicts, natural disasters, human interest.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-23 19:45", subscription: null,       totalSpent: 0,       avatar: "https://i.pravatar.cc/80?img=52" },
  { id: "USR-0023", name: "Priya Nambiar",    email: "priya@dawnwire.in",         role: "customer",  status: "active",    country: "India",       joined: "2025-11-18", reportages: 0,  balance: 5000.00, phone: "+91 98200 44321",  bio: "Senior editor at Dawn Wire Digital. Commissions South and Southeast Asia coverage.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-24 08:30", subscription: "Pro",      totalSpent: 7420.00, avatar: "https://i.pravatar.cc/80?img=44" },
  { id: "USR-0024", name: "Takeshi Morita",   email: "t.morita@nhknews.jp",       role: "customer",  status: "active",    country: "Japan",       joined: "2026-01-05", reportages: 0,  balance: 12400.00,phone: "+81 3 5422 7788",  bio: "International desk, NHK World News. Purchases footage for primetime and web distribution.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-22 13:00", subscription: "Enterprise",totalSpent: 31200.00,avatar: "https://i.pravatar.cc/80?img=68" },
  { id: "USR-0025", name: "Sasha Kovalenko",  email: "s.kovalenko@ukrinf.ua",     role: "reporter",  status: "suspended", country: "Ukraine",     joined: "2025-07-22", reportages: 18, balance: 340.00,  phone: "+380 44 321 0099", bio: "Freelance reporter. Account suspended pending dispute resolution on order #ORD-1821.", emailVerified: true,  kycVerified: false, lastLogin: "2026-04-30 11:22", subscription: null,       totalSpent: 0,       avatar: "https://i.pravatar.cc/80?img=51" },
  { id: "USR-0026", name: "Amara Diallo",     email: "amara@africanews.net",      role: "reporter",  status: "active",    country: "Senegal",     joined: "2026-02-11", reportages: 8,  balance: 680.00,  phone: "+221 77 612 3300", bio: "West Africa correspondent. Languages: French, Wolof, English.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-24 06:55", subscription: null,       totalSpent: 0,       avatar: "https://i.pravatar.cc/80?img=23" },
  { id: "USR-0027", name: "Carl Henriksson",  email: "c.henriksson@svtpress.se",  role: "customer",  status: "active",    country: "Sweden",      joined: "2026-03-07", reportages: 0,  balance: 8500.00, phone: "+46 8 784 0012",   bio: "International editor, SVT Nyheter. Covers Scandinavia and global affairs.", emailVerified: true,  kycVerified: true,  lastLogin: "2026-05-23 15:40", subscription: "Pro",      totalSpent: 14600.00,avatar: "https://i.pravatar.cc/80?img=60" },
  { id: "USR-0028", name: "Mariam Al-Rashid", email: "m.alrashid@alwatan.ae",     role: "customer",  status: "pending",   country: "UAE",         joined: "2026-05-18", reportages: 0,  balance: 0,       phone: "+971 4 430 8800",  bio: "Digital content director at Al-Watan Media Group. Pending KYC verification.", emailVerified: false, kycVerified: false, lastLogin: "2026-05-18 09:01", subscription: null,       totalSpent: 0,       avatar: "https://i.pravatar.cc/80?img=32" },
];

type SubStatus = "active" | "cancelled" | "past_due" | "trialing" | "paused";
interface SubRow {
  id: string; userId: string; userName: string; userEmail: string; userAvatar: string;
  plan: "Pro" | "Enterprise"; billing: "monthly" | "annual";
  status: SubStatus; amount: number; currency: string;
  startedAt: string; renewsAt: string | null; cancelledAt: string | null;
  paymentMethod: string;
}
const SUBSCRIPTIONS: SubRow[] = [
  { id: "SUB-001", userId: "USR-0024", userName: "Takeshi Morita",   userEmail: "t.morita@nhknews.jp",        userAvatar: "https://i.pravatar.cc/80?img=68", plan: "Enterprise", billing: "annual",   status: "active",    amount: 828,   currency: "USD", startedAt: "2026-01-05", renewsAt: "2027-01-05", cancelledAt: null,         paymentMethod: "Visa ••••4242" },
  { id: "SUB-002", userId: "USR-0023", userName: "Priya Nambiar",    userEmail: "priya@dawnwire.in",           userAvatar: "https://i.pravatar.cc/80?img=44", plan: "Pro",        billing: "annual",   status: "active",    amount: 264,   currency: "USD", startedAt: "2025-11-18", renewsAt: "2026-11-18", cancelledAt: null,         paymentMethod: "Mastercard ••••8811" },
  { id: "SUB-003", userId: "USR-0027", userName: "Carl Henriksson",  userEmail: "c.henriksson@svtpress.se",    userAvatar: "https://i.pravatar.cc/80?img=60", plan: "Pro",        billing: "monthly",  status: "active",    amount: 29,    currency: "USD", startedAt: "2026-03-07", renewsAt: "2026-06-07", cancelledAt: null,         paymentMethod: "Visa ••••3317" },
  { id: "SUB-004", userId: "USR-0031", userName: "Yuki Tanaka",      userEmail: "y.tanaka@asahidigital.jp",    userAvatar: "https://i.pravatar.cc/80?img=33", plan: "Enterprise", billing: "monthly",  status: "past_due",  amount: 89,    currency: "USD", startedAt: "2026-02-20", renewsAt: "2026-06-20", cancelledAt: null,         paymentMethod: "Amex ••••0005" },
  { id: "SUB-005", userId: "USR-0033", userName: "Leila Ahmadi",     userEmail: "l.ahmadi@iranwire.org",       userAvatar: "https://i.pravatar.cc/80?img=12", plan: "Pro",        billing: "annual",   status: "trialing",  amount: 264,   currency: "USD", startedAt: "2026-05-17", renewsAt: "2026-06-17", cancelledAt: null,         paymentMethod: "— trial —" },
  { id: "SUB-006", userId: "USR-0035", userName: "Marco Ferrante",   userEmail: "m.ferrante@la7.it",           userAvatar: "https://i.pravatar.cc/80?img=56", plan: "Pro",        billing: "monthly",  status: "cancelled", amount: 29,    currency: "USD", startedAt: "2025-12-01", renewsAt: null,          cancelledAt: "2026-04-15",  paymentMethod: "Visa ••••7790" },
  { id: "SUB-007", userId: "USR-0036", userName: "Adaeze Okafor",    userEmail: "a.okafor@channelstv.ng",      userAvatar: "https://i.pravatar.cc/80?img=19", plan: "Enterprise", billing: "annual",   status: "active",    amount: 828,   currency: "USD", startedAt: "2026-04-01", renewsAt: "2027-04-01", cancelledAt: null,         paymentMethod: "Mastercard ••••2244" },
  { id: "SUB-008", userId: "USR-0037", userName: "Pedro Alves",      userEmail: "p.alves@globonews.com.br",    userAvatar: "https://i.pravatar.cc/80?img=71", plan: "Pro",        billing: "annual",   status: "paused",    amount: 264,   currency: "USD", startedAt: "2026-01-15", renewsAt: null,          cancelledAt: null,         paymentMethod: "Visa ••••9900" },
  { id: "SUB-009", userId: "USR-0038", userName: "Natalie Gruber",   userEmail: "n.gruber@zdfdigital.de",      userAvatar: "https://i.pravatar.cc/80?img=25", plan: "Enterprise", billing: "annual",   status: "active",    amount: 828,   currency: "USD", startedAt: "2026-03-10", renewsAt: "2027-03-10", cancelledAt: null,         paymentMethod: "Mastercard ••••6612" },
  { id: "SUB-010", userId: "USR-0039", userName: "James Osei",       userEmail: "j.osei@ghanabc.com.gh",       userAvatar: "https://i.pravatar.cc/80?img=48", plan: "Pro",        billing: "monthly",  status: "active",    amount: 29,    currency: "USD", startedAt: "2026-04-22", renewsAt: "2026-06-22", cancelledAt: null,         paymentMethod: "Visa ••••1155" },
];

const PLAN_DEFS = [
  { id: "pro",        name: "Pro",        monthlyPrice: 29, annualPrice: 264, seats: 1,  features: ["Unlimited bookmarks","Priority support","Download history","Advanced filters","Early access"] },
  { id: "enterprise", name: "Enterprise", monthlyPrice: 89, annualPrice: 828, seats: 10, features: ["Everything in Pro","Team seats (up to 10)","Bulk licensing","API access","Dedicated manager","Custom invoicing"] },
];

const SUB_MRR_DATA = [
  { month: "Dec", mrr: 1480 }, { month: "Jan", mrr: 1740 }, { month: "Feb", mrr: 2020 },
  { month: "Mar", mrr: 2580 }, { month: "Apr", mrr: 3100 }, { month: "May", mrr: 3420 },
];

type DeviceType   = "desktop" | "mobile" | "tablet";
type DeviceStatus = "active" | "revoked" | "suspicious";
interface DeviceRow {
  id: string; userId: string; userName: string; userAvatar: string; userRole: string;
  type: DeviceType; os: string; browser: string;
  ip: string; location: string; lastActive: string; firstSeen: string;
  status: DeviceStatus; current: boolean;
}
const DEVICES: DeviceRow[] = [
  { id: "DEV-001", userId: "USR-0021", userName: "Elena Marchetti",  userAvatar: "https://i.pravatar.cc/80?img=47", userRole: "reporter",  type: "desktop", os: "macOS 14.4",    browser: "Chrome 124",       ip: "185.12.44.201",  location: "Milan, IT",       lastActive: "2026-05-24 07:12", firstSeen: "2025-09-14", status: "active",     current: false },
  { id: "DEV-002", userId: "USR-0021", userName: "Elena Marchetti",  userAvatar: "https://i.pravatar.cc/80?img=47", userRole: "reporter",  type: "mobile",  os: "iOS 17.4",      browser: "Safari Mobile",    ip: "185.12.44.201",  location: "Milan, IT",       lastActive: "2026-05-23 21:30", firstSeen: "2025-09-15", status: "active",     current: false },
  { id: "DEV-003", userId: "USR-0022", userName: "Daniyar Seitkali", userAvatar: "https://i.pravatar.cc/80?img=52", userRole: "reporter",  type: "mobile",  os: "Android 14",    browser: "Chrome Mobile",    ip: "95.57.12.88",    location: "Almaty, KZ",      lastActive: "2026-05-23 19:45", firstSeen: "2025-10-02", status: "active",     current: false },
  { id: "DEV-004", userId: "USR-0023", userName: "Priya Nambiar",    userAvatar: "https://i.pravatar.cc/80?img=44", userRole: "customer",  type: "desktop", os: "Windows 11",    browser: "Edge 124",         ip: "103.21.50.14",   location: "Mumbai, IN",      lastActive: "2026-05-24 08:30", firstSeen: "2025-11-18", status: "active",     current: false },
  { id: "DEV-005", userId: "USR-0024", userName: "Takeshi Morita",   userAvatar: "https://i.pravatar.cc/80?img=68", userRole: "customer",  type: "desktop", os: "macOS 14.5",    browser: "Safari 17",        ip: "61.120.33.9",    location: "Tokyo, JP",       lastActive: "2026-05-22 13:00", firstSeen: "2026-01-05", status: "active",     current: false },
  { id: "DEV-006", userId: "USR-0024", userName: "Takeshi Morita",   userAvatar: "https://i.pravatar.cc/80?img=68", userRole: "customer",  type: "tablet",  os: "iPadOS 17.4",   browser: "Safari Mobile",    ip: "61.120.33.9",    location: "Tokyo, JP",       lastActive: "2026-05-20 09:14", firstSeen: "2026-02-10", status: "active",     current: false },
  { id: "DEV-007", userId: "USR-0025", userName: "Sasha Kovalenko",  userAvatar: "https://i.pravatar.cc/80?img=51", userRole: "reporter",  type: "desktop", os: "Windows 10",    browser: "Firefox 125",      ip: "91.206.15.77",   location: "Kyiv, UA",        lastActive: "2026-04-30 11:22", firstSeen: "2025-07-22", status: "revoked",    current: false },
  { id: "DEV-008", userId: "USR-0025", userName: "Sasha Kovalenko",  userAvatar: "https://i.pravatar.cc/80?img=51", userRole: "reporter",  type: "mobile",  os: "Android 13",    browser: "Chrome Mobile",    ip: "178.93.44.211",  location: "Warsaw, PL",      lastActive: "2026-05-02 03:41", firstSeen: "2026-04-28", status: "suspicious", current: false },
  { id: "DEV-009", userId: "USR-0026", userName: "Amara Diallo",     userAvatar: "https://i.pravatar.cc/80?img=23", userRole: "reporter",  type: "mobile",  os: "Android 14",    browser: "Chrome Mobile",    ip: "41.82.100.5",    location: "Dakar, SN",       lastActive: "2026-05-24 06:55", firstSeen: "2026-02-11", status: "active",     current: false },
  { id: "DEV-010", userId: "USR-0027", userName: "Carl Henriksson",  userAvatar: "https://i.pravatar.cc/80?img=60", userRole: "customer",  type: "desktop", os: "macOS 14.4",    browser: "Chrome 124",       ip: "217.212.10.33",  location: "Stockholm, SE",   lastActive: "2026-05-23 15:40", firstSeen: "2026-03-07", status: "active",     current: false },
  { id: "DEV-011", userId: "USR-0028", userName: "Mariam Al-Rashid", userAvatar: "https://i.pravatar.cc/80?img=32", userRole: "customer",  type: "mobile",  os: "iOS 17.3",      browser: "Safari Mobile",    ip: "94.200.11.88",   location: "Dubai, AE",       lastActive: "2026-05-18 09:01", firstSeen: "2026-05-18", status: "active",     current: false },
  { id: "DEV-012", userId: "USR-0021", userName: "Elena Marchetti",  userAvatar: "https://i.pravatar.cc/80?img=47", userRole: "reporter",  type: "desktop", os: "Ubuntu 22.04",  browser: "Firefox 124",      ip: "212.40.11.5",    location: "Rome, IT",        lastActive: "2026-04-12 14:20", firstSeen: "2025-11-01", status: "revoked",    current: false },
  { id: "DEV-013", userId: "USR-0024", userName: "Takeshi Morita",   userAvatar: "https://i.pravatar.cc/80?img=68", userRole: "customer",  type: "desktop", os: "Windows 11",    browser: "Chrome 123",       ip: "202.32.88.101",  location: "Osaka, JP",       lastActive: "2026-03-18 11:05", firstSeen: "2026-03-15", status: "suspicious", current: false },
];

interface ReporterProfile {
  userId: string;
  rating: number;          // 1–5
  reviewCount: number;
  featured: boolean;
  verified: boolean;       // editorial badge
  languages: string[];
  equipment: string[];
  categories: string[];
  payoutMethod: "Bank transfer" | "PayPal" | "Wise";
  payoutAccount: string;
  revenueShare: number;    // %
  totalEarned: number;
  pendingPayout: number;
  soldCount: number;       // reportages that found a buyer
  responseTime: string;    // e.g. "< 2 h"
  coverImg: string;
}
const REPORTER_PROFILES: ReporterProfile[] = [
  {
    userId: "USR-0021", rating: 4.9, reviewCount: 38, featured: true,  verified: true,
    languages: ["Italian","English","French"],
    equipment: ["Sony FX3","DJI Mavic 3 Pro","Rode Wireless GO II"],
    categories: ["Politics","Culture","Business"],
    payoutMethod: "Bank transfer", payoutAccount: "IT60 X054 2811 1010 0000 0123 456",
    revenueShare: 90, totalEarned: 12840, pendingPayout: 2840.50,
    soldCount: 41, responseTime: "< 1 h",
    coverImg: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=280&fit=crop&auto=format",
  },
  {
    userId: "USR-0022", rating: 4.7, reviewCount: 24, featured: true,  verified: true,
    languages: ["Kazakh","Russian","English"],
    equipment: ["Canon EOS R5","DJI Mini 4 Pro","Zoom H6"],
    categories: ["Environment","Conflict","Social"],
    payoutMethod: "Wise", payoutAccount: "KZ247 5600 0000 0000 0001",
    revenueShare: 90, totalEarned: 7120, pendingPayout: 1920.00,
    soldCount: 27, responseTime: "< 2 h",
    coverImg: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&h=280&fit=crop&auto=format",
  },
  {
    userId: "USR-0025", rating: 4.2, reviewCount: 11, featured: false, verified: false,
    languages: ["Ukrainian","Russian","English"],
    equipment: ["Sony A7 IV","iPhone 15 Pro"],
    categories: ["Conflict","Politics"],
    payoutMethod: "PayPal", payoutAccount: "s.kovalenko@ukrinf.ua",
    revenueShare: 90, totalEarned: 3460, pendingPayout: 340.00,
    soldCount: 14, responseTime: "< 4 h",
    coverImg: "https://images.unsplash.com/photo-1566384359565-d3c0b36b5f82?w=800&h=280&fit=crop&auto=format",
  },
  {
    userId: "USR-0026", rating: 4.6, reviewCount: 6, featured: false, verified: true,
    languages: ["French","Wolof","English"],
    equipment: ["Canon EOS R6 II","DJI Osmo Pocket 3"],
    categories: ["Labor","Social","Culture"],
    payoutMethod: "Wise", payoutAccount: "SN_WISE_AMARA_001",
    revenueShare: 90, totalEarned: 2180, pendingPayout: 680.00,
    soldCount: 7, responseTime: "< 3 h",
    coverImg: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=280&fit=crop&auto=format",
  },
];

interface TxRow {
  id: string; user: string; type: "deposit" | "withdrawal" | "purchase";
  amount: number; currency: string; status: TxStatus;
  method: string; date: string; ref: string;
}
const TRANSACTIONS: TxRow[] = [
  { id: "TXN-4491", user: "Takeshi Morita", type: "deposit", amount: 5000.00, currency: "USD", status: "completed", method: "Wire Transfer", date: "2026-05-23 14:32", ref: "WT-88291" },
  { id: "TXN-4490", user: "Elena Marchetti", type: "withdrawal", amount: 840.50, currency: "USD", status: "processing", method: "Bank Transfer", date: "2026-05-23 11:18", ref: "BT-77120" },
  { id: "TXN-4489", user: "Carl Henriksson", type: "purchase", amount: 320.00, currency: "USD", status: "completed", method: "Wallet", date: "2026-05-22 18:45", ref: "PUR-3821" },
  { id: "TXN-4488", user: "Priya Nambiar", type: "deposit", amount: 2000.00, currency: "USD", status: "completed", method: "Credit Card", date: "2026-05-22 09:11", ref: "CC-55017" },
  { id: "TXN-4487", user: "Daniyar Seitkali", type: "withdrawal", amount: 1200.00, currency: "USD", status: "failed", method: "Bank Transfer", date: "2026-05-21 16:30", ref: "BT-77088" },
  { id: "TXN-4486", user: "Amara Diallo", type: "withdrawal", amount: 350.00, currency: "USD", status: "completed", method: "PayPal", date: "2026-05-21 10:05", ref: "PP-29312" },
  { id: "TXN-4485", user: "Carl Henriksson", type: "purchase", amount: 180.00, currency: "USD", status: "refunded", method: "Wallet", date: "2026-05-20 14:22", ref: "PUR-3804" },
  { id: "TXN-4484", user: "Mariam Al-Rashid", type: "deposit", amount: 10000.00, currency: "USD", status: "pending", method: "Wire Transfer", date: "2026-05-20 08:00", ref: "WT-88280" },
];

interface WithdrawalRow {
  id: string; user: string; userId: string; amount: number;
  method: string; bankName: string; bankAccount: string;
  status: "pending" | "approved" | "processing" | "completed" | "rejected";
  requested: string; processed: string | null; note: string;
}
const WITHDRAWALS: WithdrawalRow[] = [
  { id: "WTH-1021", user: "Elena Marchetti",  userId: "USR-0021", amount: 840.50,  method: "Bank Transfer", bankName: "UniCredit Italy", bankAccount: "****8821", status: "processing", requested: "2026-05-23 11:18", processed: null,              note: "" },
  { id: "WTH-1020", user: "Daniyar Seitkali", userId: "USR-0022", amount: 1200.00, method: "Bank Transfer", bankName: "Halyk Bank",     bankAccount: "****4410", status: "rejected",   requested: "2026-05-21 16:30", processed: "2026-05-21 17:00", note: "Invalid bank routing number" },
  { id: "WTH-1019", user: "Amara Diallo",     userId: "USR-0026", amount: 350.00,  method: "PayPal",        bankName: "PayPal",        bankAccount: "amara@africanews.net", status: "completed", requested: "2026-05-21 10:05", processed: "2026-05-21 10:30", note: "" },
  { id: "WTH-1018", user: "Elena Marchetti",  userId: "USR-0021", amount: 520.00,  method: "Bank Transfer", bankName: "UniCredit Italy", bankAccount: "****8821", status: "completed", requested: "2026-05-18 09:00", processed: "2026-05-18 11:15", note: "" },
  { id: "WTH-1017", user: "Daniyar Seitkali", userId: "USR-0022", amount: 480.00,  method: "Bank Transfer", bankName: "Halyk Bank",     bankAccount: "****4410", status: "completed", requested: "2026-05-14 14:30", processed: "2026-05-14 16:00", note: "" },
  { id: "WTH-1016", user: "Priya Nambiar",    userId: "USR-0023", amount: 2200.00, method: "Wire Transfer", bankName: "HDFC Bank",     bankAccount: "****9033", status: "pending",   requested: "2026-05-24 08:45", processed: null,              note: "" },
  { id: "WTH-1015", user: "Amara Diallo",     userId: "USR-0026", amount: 180.00,  method: "PayPal",        bankName: "PayPal",        bankAccount: "amara@africanews.net", status: "pending", requested: "2026-05-23 16:55", processed: null, note: "" },
  { id: "WTH-1014", user: "Klaus Weber",      userId: "USR-0028", amount: 640.00,  method: "Bank Transfer", bankName: "Deutsche Bank", bankAccount: "****7762", status: "approved",  requested: "2026-05-22 12:00", processed: null,              note: "Ready for processing" },
];

interface ActivityRow {
  id: string; user: string; role: string; action: string;
  resource: string; ip: string; time: string;
  result: "success" | "failed" | "warning";
}
const ACTIVITY_LOG: ActivityRow[] = [
  { id: "EVT-8801", user: "Admin",            role: "admin",    action: "Approved withdrawal",   resource: "WTH-1019", ip: "192.168.1.1",  time: "2026-05-24 09:32", result: "success" },
  { id: "EVT-8800", user: "Sasha Kovalenko",  role: "reporter", action: "Login failed",          resource: "auth",     ip: "91.224.43.18", time: "2026-05-24 08:55", result: "failed"  },
  { id: "EVT-8799", user: "Takeshi Morita",   role: "customer", action: "Purchased reportage",   resource: "RPT-2241", ip: "103.55.12.99", time: "2026-05-24 08:22", result: "success" },
  { id: "EVT-8798", user: "Elena Marchetti",  role: "reporter", action: "Submitted reportage",   resource: "RPT-2240", ip: "79.40.12.33",  time: "2026-05-23 18:10", result: "success" },
  { id: "EVT-8797", user: "Admin",            role: "admin",    action: "Rejected withdrawal",   resource: "WTH-1020", ip: "192.168.1.1",  time: "2026-05-23 17:00", result: "warning" },
  { id: "EVT-8796", user: "Amara Diallo",     role: "reporter", action: "Login",                 resource: "auth",     ip: "41.188.51.12", time: "2026-05-23 14:05", result: "success" },
  { id: "EVT-8795", user: "Mariam Al-Rashid", role: "customer", action: "Deposit initiated",     resource: "TXN-4484", ip: "5.62.18.200",  time: "2026-05-22 08:00", result: "success" },
  { id: "EVT-8794", user: "Carl Henriksson",  role: "customer", action: "Requested refund",      resource: "RPT-2239", ip: "213.108.55.44",time: "2026-05-21 15:30", result: "warning" },
  { id: "EVT-8793", user: "Priya Nambiar",    role: "customer", action: "Profile updated",       resource: "USR-0023", ip: "103.55.12.99", time: "2026-05-21 11:20", result: "success" },
  { id: "EVT-8792", user: "Daniyar Seitkali", role: "reporter", action: "Password changed",      resource: "USR-0022", ip: "77.245.18.80", time: "2026-05-20 09:45", result: "success" },
  { id: "EVT-8791", user: "Admin",            role: "admin",    action: "Account suspended",     resource: "USR-0025", ip: "192.168.1.1",  time: "2026-05-20 08:30", result: "warning" },
  { id: "EVT-8790", user: "Klaus Weber",      role: "reporter", action: "Submitted reportage",   resource: "RPT-2244", ip: "85.14.120.3",  time: "2026-05-19 16:00", result: "success" },
];

interface AdminNotifRow {
  id: string; type: "fraud" | "system" | "high-value" | "dispute" | "withdrawal" | "av-alert";
  title: string; body: string; time: string; read: boolean;
  priority: "high" | "medium" | "low"; ref: string;
}
const ADMIN_NOTIFS: AdminNotifRow[] = [
  { id: "NOTIF-201", type: "high-value",  priority: "high",   read: false, time: "1h ago",  ref: "TXN-4484", title: "High-value deposit flagged",       body: "TXN-4484 — Mariam Al-Rashid deposited $10,000.00 via Wire Transfer. KYC review required before release." },
  { id: "NOTIF-200", type: "fraud",       priority: "high",   read: false, time: "3h ago",  ref: "USR-0025", title: "Suspicious login activity",         body: "USR-0025 (Sasha Kovalenko) had 5 failed logins from 91.224.43.18 within 10 minutes. Account locked." },
  { id: "NOTIF-199", type: "dispute",     priority: "medium", read: false, time: "5h ago",  ref: "DSP-019",  title: "New dispute opened",                body: "DSP-019 — Carl Henriksson filed a dispute for RPT-2239 (Street Art Festival Porto 2026). Awaiting review." },
  { id: "NOTIF-198", type: "withdrawal",  priority: "medium", read: true,  time: "8h ago",  ref: "WTH-1016", title: "Withdrawal pending approval",        body: "WTH-1016 — Priya Nambiar requested $2,200.00 via Wire Transfer (HDFC Bank). Approval needed." },
  { id: "NOTIF-197", type: "av-alert",    priority: "high",   read: true,  time: "12h ago", ref: "DEL-0033", title: "AV scan warning",                   body: "DEL-0033 — File for RPT-2235 returned a heuristic warning from scanner engine v3.2. Manual review advised." },
  { id: "NOTIF-196", type: "system",      priority: "low",    read: true,  time: "1d ago",  ref: "",         title: "Scheduled maintenance tonight",     body: "Platform maintenance window: 2026-05-24 02:00–04:00 UTC. Storage cluster rolling restart. No data loss expected." },
  { id: "NOTIF-195", type: "system",      priority: "low",    read: true,  time: "1d ago",  ref: "",         title: "Database backup completed",         body: "Daily backup completed successfully. 847 GB archived to off-site storage (Frankfurt, DE)." },
  { id: "NOTIF-194", type: "dispute",     priority: "medium", read: true,  time: "2d ago",  ref: "DSP-018",  title: "Dispute DSP-018 resolved",          body: "DSP-018 — Resolved in favor of reporter. Refund of $180.00 issued to Carl Henriksson (TXN-4485-R)." },
];

const EARNINGS_BREAKDOWN = [
  { category: "Video Reportages", revenue: 18400, commission: 1840, pct: 59, count: 41 },
  { category: "Photo Reportages", revenue:  7200, commission:  720, pct: 23, count: 28 },
  { category: "Subscriptions",    revenue:  3800, commission: 3800, pct: 12, count: 19 },
  { category: "Audio Reportages", revenue:  1800, commission:  180, pct:  6, count: 12 },
];

const MONTHLY_EARNINGS = [
  { month: "Jun", gross: 11200, commission: 1120, net:  8960 },
  { month: "Jul", gross: 14800, commission: 1480, net: 11840 },
  { month: "Aug", gross: 13200, commission: 1320, net: 10560 },
  { month: "Sep", gross: 17900, commission: 1790, net: 14320 },
  { month: "Oct", gross: 16300, commission: 1630, net: 13040 },
  { month: "Nov", gross: 20500, commission: 2050, net: 16400 },
  { month: "Dec", gross: 18800, commission: 1880, net: 15040 },
  { month: "Jan", gross: 22400, commission: 2240, net: 17920 },
  { month: "Feb", gross: 25200, commission: 2520, net: 20160 },
  { month: "Mar", gross: 23100, commission: 2310, net: 18480 },
  { month: "Apr", gross: 27700, commission: 2770, net: 22160 },
  { month: "May", gross: 31200, commission: 3120, net: 24960 },
];

// ── Monitoring mock data ───────────────────────────────────────────────────────
interface ErrorRow {
  id: string; hash: string; message: string; stack: string;
  level: "fatal" | "error" | "warning"; service: string;
  count: number; users: number; firstSeen: string; lastSeen: string;
  status: "unresolved" | "resolved" | "ignored";
}
const ERROR_INBOX: ErrorRow[] = [
  { id: "ERR-5501", hash: "a3f9d2e1", level: "fatal",   status: "unresolved", service: "payment-service",    count: 3,  users: 2, firstSeen: "2026-05-21 16:30", lastSeen: "2026-05-23 11:18", message: "TypeError: Cannot read properties of undefined (reading 'amount')",       stack: "at WalletService.processWithdrawal (wallet.service.ts:142:18)" },
  { id: "ERR-5500", hash: "b8c4e7f2", level: "error",   status: "unresolved", service: "auth-service",       count: 47, users: 1, firstSeen: "2026-05-20 14:10", lastSeen: "2026-05-24 08:55", message: "JWTVerificationError: Invalid token signature",                            stack: "at AuthMiddleware.verify (auth.middleware.ts:88:7)" },
  { id: "ERR-5499", hash: "c2d6a9b3", level: "error",   status: "unresolved", service: "storage-service",    count: 12, users: 4, firstSeen: "2026-05-19 09:00", lastSeen: "2026-05-23 22:15", message: "S3Error: RequestTimeout uploading to bucket eu-west-media-prod",           stack: "at StorageService.upload (storage.service.ts:214:5)" },
  { id: "ERR-5498", hash: "d4e8b1c5", level: "error",   status: "resolved",   service: "payment-service",    count: 2,  users: 0, firstSeen: "2026-05-23 17:02", lastSeen: "2026-05-23 17:02", message: "StripeError: Webhook signature verification failed",                       stack: "at PaymentController.webhook (payment.controller.ts:55:3)" },
  { id: "ERR-5497", hash: "e6f0c3d7", level: "error",   status: "resolved",   service: "withdrawal-service", count: 1,  users: 1, firstSeen: "2026-05-21 16:30", lastSeen: "2026-05-21 16:30", message: "ValidationError: BankAccountNumber format invalid for country KZ",        stack: "at WithdrawalService.validate (withdrawal.service.ts:77:11)" },
  { id: "ERR-5496", hash: "f1a2b3c4", level: "warning", status: "ignored",    service: "feed-parser",        count: 8,  users: 0, firstSeen: "2026-05-18 12:00", lastSeen: "2026-05-23 15:00", message: "RSSParseError: channel element missing required <title> tag",             stack: "at FeedParser.parse (feed-parser.ts:33:14)" },
  { id: "ERR-5495", hash: "g5h6i7j8", level: "warning", status: "unresolved", service: "av-scanner",         count: 2,  users: 1, firstSeen: "2026-05-23 07:18", lastSeen: "2026-05-24 07:18", message: "TimeoutError: AV scan exceeded 120s limit for delivery DEL-0033",         stack: "at AVScanner.scan (scanner.service.ts:98:22)" },
];

interface LogRow {
  id: string; level: "ERROR" | "WARN" | "INFO" | "DEBUG";
  service: string; message: string; requestId: string;
  time: string; duration: number | null;
}
const APP_LOGS: LogRow[] = [
  { id: "LOG-9901", level: "ERROR", service: "payment-service",    requestId: "req_7x2k9a", time: "2026-05-24 09:32:11.422", duration: 342,     message: "Failed to process withdrawal WTH-1020: bank routing validation error (code BRV-04)" },
  { id: "LOG-9900", level: "ERROR", service: "auth-service",       requestId: "req_4m8n2p", time: "2026-05-24 08:55:03.118", duration: 12,      message: "JWT verification failed: token signature mismatch for user USR-0025" },
  { id: "LOG-9899", level: "WARN",  service: "av-scanner",         requestId: "req_9q3r7s", time: "2026-05-24 07:18:44.891", duration: 8104,    message: "Heuristic flag on delivery DEL-0033: rule HEU-4422 triggered, score 72/100" },
  { id: "LOG-9898", level: "ERROR", service: "storage-service",    requestId: "req_2c5f8h", time: "2026-05-23 22:15:30.204", duration: 30001,   message: "S3 upload timeout for RPT-2244 after 30s: bucket eu-west-media-prod unresponsive" },
  { id: "LOG-9897", level: "WARN",  service: "email-service",      requestId: "req_6j1k4n", time: "2026-05-23 18:42:09.557", duration: null,    message: "SMTP queue depth high: 847 messages pending, threshold 500 exceeded" },
  { id: "LOG-9896", level: "ERROR", service: "payment-service",    requestId: "req_8p5q2t", time: "2026-05-23 17:02:14.778", duration: 5,       message: "Stripe webhook signature validation failed: evt_3PqJ2x2KSuP8rMnKdemo" },
  { id: "LOG-9895", level: "INFO",  service: "scheduler",          requestId: "req_1a4b7e", time: "2026-05-23 15:00:02.001", duration: 14320,   message: "Feed sync completed: 7 sources, 312 new entries ingested, 0 errors" },
  { id: "LOG-9894", level: "WARN",  service: "cdn-proxy",          requestId: "req_3d6g9j", time: "2026-05-23 12:55:00.310", duration: 30000,   message: "Origin timeout on image resize for RPT-2238 thumbnail (1920×1080 → 400×240)" },
  { id: "LOG-9893", level: "ERROR", service: "auth-service",       requestId: "req_5h8k1m", time: "2026-05-23 08:55:03.211", duration: 2,       message: "Rate limit exceeded for 91.224.43.18: 12 auth attempts/min (limit: 5)" },
  { id: "LOG-9892", level: "INFO",  service: "backup-service",     requestId: "req_7j2m5p", time: "2026-05-23 04:00:44.900", duration: 3621000, message: "Daily snapshot complete: 847 GB archived to s3://godigimarket-backups/2026-05-23/" },
  { id: "LOG-9891", level: "DEBUG", service: "feed-parser",        requestId: "req_2n5q8t", time: "2026-05-23 15:00:15.444", duration: 88,      message: "RSS 2.0 parse warning: <channel> missing optional <lastBuildDate> element (FEED-004)" },
  { id: "LOG-9890", level: "WARN",  service: "worker",             requestId: "req_4p7s0v", time: "2026-05-22 16:18:29.112", duration: null,    message: "Delivery worker queue depth: 42 items pending, threshold 30 exceeded" },
];

interface FeedRow {
  id: string; name: string; url: string; format: "RSS" | "Atom" | "JSON";
  category: string; interval: string; lastFetched: string;
  itemCount: number; status: "active" | "error" | "paused"; errorMsg?: string;
}
const FEEDS: FeedRow[] = [
  { id: "FEED-001", name: "Reuters World News",      url: "https://feeds.reuters.com/reuters/worldNews",         format: "RSS",  category: "World",    interval: "15m", lastFetched: "2026-05-24 09:00", itemCount: 1240, status: "active" },
  { id: "FEED-002", name: "AP Top News",             url: "https://rsshub.app/apnews/topics/ap-top-news",        format: "RSS",  category: "Breaking", interval: "10m", lastFetched: "2026-05-24 08:45", itemCount: 880,  status: "active" },
  { id: "FEED-003", name: "Euronews World",          url: "https://feeds.euronews.com/news/world",               format: "RSS",  category: "Europe",   interval: "30m", lastFetched: "2026-05-24 09:00", itemCount: 540,  status: "active" },
  { id: "FEED-004", name: "TASS International",      url: "https://tass.com/rss/v2.xml",                         format: "RSS",  category: "CIS",      interval: "30m", lastFetched: "2026-05-23 22:30", itemCount: 312,  status: "error",  errorMsg: "HTTP 503 after 3 retries" },
  { id: "FEED-005", name: "Al Jazeera English",      url: "https://www.aljazeera.com/xml/rss/all.xml",           format: "RSS",  category: "MENA",     interval: "15m", lastFetched: "2026-05-24 09:00", itemCount: 720,  status: "active" },
  { id: "FEED-006", name: "DW World",                url: "https://rss.dw.com/rdf/rss-en-world",                 format: "Atom", category: "Europe",   interval: "20m", lastFetched: "2026-05-24 08:30", itemCount: 460,  status: "paused" },
  { id: "FEED-007", name: "Conflict Monitor API",    url: "https://api.conflictmonitor.org/v2/events.json",      format: "JSON", category: "Conflict", interval: "5m",  lastFetched: "2026-05-24 09:05", itemCount: 180,  status: "active" },
];

interface FeedEntryRow {
  id: string; title: string; source: string; sourceId: string;
  published: string; ingested: string;
  status: "new" | "processed" | "ignored" | "published";
  category: string; tags: string[]; summary: string;
}
const FEED_ENTRIES: FeedEntryRow[] = [
  { id: "FE-10041", sourceId: "FEED-001", source: "Reuters World News",   status: "new",       category: "Environment", tags: ["flood","Kazakhstan","evacuation"], published: "2026-05-24 08:32", ingested: "2026-05-24 08:45", title: "Flooding in southern Kazakhstan forces 12,000 evacuations", summary: "Heavy rainfall and rapid snowmelt have caused severe flooding across three southern provinces of Kazakhstan, with emergency services deploying boats and helicopters to reach stranded residents." },
  { id: "FE-10040", sourceId: "FEED-003", source: "Euronews World",       status: "processed", category: "Politics",     tags: ["EU","press freedom","legislation"], published: "2026-05-24 07:15", ingested: "2026-05-24 07:30", title: "EU Parliament votes on emergency press freedom directive", summary: "The European Parliament passed a landmark directive requiring member states to protect journalists from strategic lawsuits (SLAPPs) and guarantee access to conflict zones." },
  { id: "FE-10039", sourceId: "FEED-002", source: "AP Top News",          status: "new",       category: "Conflict",     tags: ["Gaza","ceasefire","negotiations"],  published: "2026-05-24 06:50", ingested: "2026-05-24 07:00", title: "Mediators resume ceasefire talks as aid convoy reaches northern Gaza", summary: "International mediators restarted negotiations in Cairo while a convoy of 48 UN aid trucks successfully entered northern Gaza for the first time in 11 days." },
  { id: "FE-10038", sourceId: "FEED-007", source: "Conflict Monitor API", status: "published", category: "Conflict",     tags: ["Sudan","Darfur","displacement"],    published: "2026-05-24 05:10", ingested: "2026-05-24 05:15", title: "UNHCR reports 340,000 newly displaced in Darfur over 72 hours", summary: "The UN refugee agency reported a sharp spike in displacement in the North Darfur region, citing renewed fighting between the Sudanese Armed Forces and RSF paramilitaries." },
  { id: "FE-10037", sourceId: "FEED-005", source: "Al Jazeera English",   status: "new",       category: "Politics",     tags: ["Iran","elections","nuclear"],       published: "2026-05-24 04:30", ingested: "2026-05-24 04:45", title: "Iran holds snap presidential election as nuclear talks stall", summary: "Iranians went to the polls in an election called six months ahead of schedule, with voter turnout and nuclear policy dominating the contest between two conservative candidates." },
  { id: "FE-10036", sourceId: "FEED-001", source: "Reuters World News",   status: "ignored",   category: "Business",     tags: ["markets","S&P500","tech"],          published: "2026-05-23 21:00", ingested: "2026-05-23 21:15", title: "Tech stocks pull S&P 500 to record high on AI earnings beat", summary: "US equities closed at an all-time high as three major technology companies reported quarterly earnings that surpassed analyst estimates by wide margins." },
  { id: "FE-10035", sourceId: "FEED-003", source: "Euronews World",       status: "processed", category: "Environment",  tags: ["climate","wildfire","Greece"],      published: "2026-05-23 18:45", ingested: "2026-05-23 19:00", title: "Wildfires spread across three Greek islands as heatwave intensifies", summary: "Firefighters from six EU countries were deployed to assist Greek authorities as fast-moving fires destroyed thousands of hectares of forest on Lesbos, Chios, and Rhodes." },
];

interface CmsArticleRow {
  id: string; title: string; slug: string; author: string;
  status: "published" | "draft" | "scheduled" | "archived";
  section: string; views: number; publishedAt: string | null; updatedAt: string;
}
const CMS_ARTICLES: CmsArticleRow[] = [
  { id: "ART-001", title: "How GoDigiMarket Connects Reporters to Global Buyers",  slug: "how-godigimarket-connects-reporters",  author: "Admin",         status: "published",  section: "Blog",       views: 3841, publishedAt: "2026-04-10", updatedAt: "2026-04-10" },
  { id: "ART-002", title: "Covering Conflict: A Reporter's Field Guide 2026",       slug: "covering-conflict-reporters-guide",    author: "Elena Marchetti",status: "published",  section: "Guides",     views: 2107, publishedAt: "2026-03-22", updatedAt: "2026-04-01" },
  { id: "ART-003", title: "Platform Update: New AI-Assisted Delivery Verification", slug: "platform-update-ai-delivery-verify",   author: "Admin",         status: "published",  section: "Updates",    views: 965,  publishedAt: "2026-05-01", updatedAt: "2026-05-01" },
  { id: "ART-004", title: "Investigative Reportage Grants — May 2026 Round",        slug: "investigative-grants-may-2026",        author: "Admin",         status: "scheduled",  section: "News",       views: 0,    publishedAt: "2026-05-28", updatedAt: "2026-05-23" },
  { id: "ART-005", title: "Drone Journalism: Legal Checklist by Country",           slug: "drone-journalism-legal-checklist",     author: "Daniyar Seitkali",status: "draft",    section: "Guides",     views: 0,    publishedAt: null,         updatedAt: "2026-05-20" },
  { id: "ART-006", title: "Q1 2026 Marketplace Statistics",                         slug: "q1-2026-marketplace-statistics",       author: "Admin",         status: "archived",   section: "Reports",    views: 1244, publishedAt: "2026-04-15", updatedAt: "2026-04-15" },
];

interface CmsPageRow {
  id: string; title: string; slug: string;
  status: "published" | "draft";
  template: "standard" | "landing" | "legal"; updatedAt: string;
}
const CMS_PAGES: CmsPageRow[] = [
  { id: "PG-001", title: "About GoDigiMarket",       slug: "about",              status: "published", template: "standard", updatedAt: "2026-03-14" },
  { id: "PG-002", title: "Terms of Service",          slug: "terms",              status: "published", template: "legal",    updatedAt: "2026-04-02" },
  { id: "PG-003", title: "Privacy Policy",            slug: "privacy",            status: "published", template: "legal",    updatedAt: "2026-04-02" },
  { id: "PG-004", title: "For Reporters",             slug: "for-reporters",      status: "published", template: "landing",  updatedAt: "2026-02-28" },
  { id: "PG-005", title: "For Media Buyers",          slug: "for-buyers",         status: "published", template: "landing",  updatedAt: "2026-02-28" },
  { id: "PG-006", title: "Refund Policy",             slug: "refund-policy",      status: "draft",     template: "legal",    updatedAt: "2026-05-18" },
  { id: "PG-007", title: "Press Room",                slug: "press",              status: "draft",     template: "standard", updatedAt: "2026-05-21" },
];

interface CmsMenuRow {
  id: string; name: string; location: "header" | "footer" | "mobile";
  itemCount: number; updatedAt: string;
}
interface CmsMenuItemRow {
  id: string; menuId: string; label: string; url: string;
  type: "page" | "link" | "dropdown"; order: number; parent: string | null;
}
const CMS_MENUS: CmsMenuRow[] = [
  { id: "MN-001", name: "Primary Navigation", location: "header",  itemCount: 6, updatedAt: "2026-04-12" },
  { id: "MN-002", name: "Footer Links",        location: "footer",  itemCount: 9, updatedAt: "2026-03-30" },
  { id: "MN-003", name: "Mobile Menu",         location: "mobile",  itemCount: 7, updatedAt: "2026-04-12" },
];
const CMS_MENU_ITEMS: CmsMenuItemRow[] = [
  { id: "MI-001", menuId: "MN-001", label: "Marketplace",    url: "/marketplace",    type: "link",     order: 1, parent: null },
  { id: "MI-002", menuId: "MN-001", label: "Reporters",      url: "/reporters",      type: "link",     order: 2, parent: null },
  { id: "MI-003", menuId: "MN-001", label: "Pricing",        url: "/pricing",        type: "link",     order: 3, parent: null },
  { id: "MI-004", menuId: "MN-001", label: "About",          url: "/about",          type: "page",     order: 4, parent: null },
  { id: "MI-005", menuId: "MN-001", label: "Resources",      url: "#",               type: "dropdown", order: 5, parent: null },
  { id: "MI-006", menuId: "MN-001", label: "Guides",         url: "/guides",         type: "link",     order: 1, parent: "MI-005" },
  { id: "MI-007", menuId: "MN-001", label: "Blog",           url: "/blog",           type: "link",     order: 2, parent: "MI-005" },
  { id: "MI-008", menuId: "MN-002", label: "Terms",          url: "/terms",          type: "page",     order: 1, parent: null },
  { id: "MI-009", menuId: "MN-002", label: "Privacy",        url: "/privacy",        type: "page",     order: 2, parent: null },
  { id: "MI-010", menuId: "MN-002", label: "Refund Policy",  url: "/refund-policy",  type: "page",     order: 3, parent: null },
  { id: "MI-011", menuId: "MN-002", label: "For Reporters",  url: "/for-reporters",  type: "page",     order: 4, parent: null },
  { id: "MI-012", menuId: "MN-002", label: "For Buyers",     url: "/for-buyers",     type: "page",     order: 5, parent: null },
  { id: "MI-013", menuId: "MN-002", label: "Press",          url: "/press",          type: "page",     order: 6, parent: null },
];

const CMS_SETTINGS_HISTORY = [
  { id: "SH-001", field: "site_name",        old: "GoDigiMarket Beta", newVal: "GoDigiMarket",           user: "Admin", at: "2026-04-15 10:22" },
  { id: "SH-002", field: "default_currency", old: "EUR",               newVal: "USD",                    user: "Admin", at: "2026-04-15 10:23" },
  { id: "SH-003", field: "maintenance_mode", old: "false",             newVal: "true",                   user: "Admin", at: "2026-04-28 02:00" },
  { id: "SH-004", field: "maintenance_mode", old: "true",              newVal: "false",                  user: "Admin", at: "2026-04-28 05:30" },
  { id: "SH-005", field: "platform_fee_pct", old: "8",                 newVal: "10",                     user: "Admin", at: "2026-05-01 09:00" },
  { id: "SH-006", field: "max_file_size_mb", old: "500",               newVal: "800",                    user: "Admin", at: "2026-05-10 14:15" },
  { id: "SH-007", field: "support_email",    old: "help@godigimarket.io", newVal: "support@godigimarket.io", user: "Admin", at: "2026-05-14 11:40" },
  { id: "SH-008", field: "smtp_host",        old: "smtp.mailgun.org",  newVal: "smtp.sendgrid.net",      user: "Admin", at: "2026-05-20 16:05" },
];

// ── Newsletter mock data ───────────────────────────────────────────────────────
type NewsletterStatus = "draft" | "scheduled" | "sent" | "archived";

interface NewsletterRow {
  id: string; subject: string; preheader: string;
  status: NewsletterStatus;
  audience: "all" | "buyers" | "reporters" | "subscribers";
  recipientCount: number;
  openRate: number | null; clickRate: number | null;
  scheduledAt: string | null; sentAt: string | null; createdAt: string;
  author: string; tags: string[];
  bodyHtml: string;
}

const NEWSLETTERS: NewsletterRow[] = [
  { id: "NL-009", subject: "GoDigiMarket Weekly Digest — May 2026 #3",        preheader: "Top reportages this week, new reporter spotlight, and platform updates.",    status: "sent",      audience: "all",         recipientCount: 12480, openRate: 38.4, clickRate: 6.2,  scheduledAt: "2026-05-19 08:00", sentAt: "2026-05-19 08:00", createdAt: "2026-05-17", author: "Admin", tags: ["digest","weekly"] },
  { id: "NL-010", subject: "New Feature: Request Marketplace is Live",          preheader: "Commission reportages from verified field reporters worldwide.",              status: "sent",      audience: "buyers",      recipientCount: 4210,  openRate: 52.1, clickRate: 14.7, scheduledAt: "2026-05-14 10:00", sentAt: "2026-05-14 10:00", createdAt: "2026-05-13", author: "Admin", tags: ["feature","buyers"] },
  { id: "NL-011", subject: "Reporter Spotlight: Elena Marchetti — Rome",        preheader: "How Elena covered four EU summits in 12 months.",                           status: "sent",      audience: "all",         recipientCount: 12310, openRate: 41.9, clickRate: 8.3,  scheduledAt: "2026-05-07 08:00", sentAt: "2026-05-07 08:00", createdAt: "2026-05-05", author: "Admin", tags: ["spotlight","reporter"] },
  { id: "NL-012", subject: "GoDigiMarket Weekly Digest — May 2026 #4",         preheader: "Breaking coverage from 6 continents, platform stats, and upcoming events.", status: "scheduled", audience: "all",         recipientCount: 12520, openRate: null, clickRate: null, scheduledAt: "2026-05-26 08:00", sentAt: null,               createdAt: "2026-05-23", author: "Admin", tags: ["digest","weekly"] },
  { id: "NL-013", subject: "Earn More: New Payout Tiers for Top Reporters",     preheader: "Platinum tier reporters now earn 82% revenue share.",                       status: "scheduled", audience: "reporters",   recipientCount: 2180,  openRate: null, clickRate: null, scheduledAt: "2026-05-28 09:00", sentAt: null,               createdAt: "2026-05-22", author: "Admin", tags: ["monetisation","reporters"] },
  { id: "NL-014", subject: "Exclusive Briefing: East Africa Coverage Surge",    preheader: "Demand for ground reporting in the Horn of Africa is up 340%.",             status: "draft",     audience: "buyers",      recipientCount: 0,     openRate: null, clickRate: null, scheduledAt: null,               sentAt: null,               createdAt: "2026-05-23", author: "Admin", tags: ["briefing","buyers"] },
  { id: "NL-015", subject: "Platform Maintenance — May 31, 02:00–04:00 UTC",   preheader: "Brief downtime for infrastructure upgrades. No data loss expected.",        status: "draft",     audience: "all",         recipientCount: 0,     openRate: null, clickRate: null, scheduledAt: null,               sentAt: null,               createdAt: "2026-05-23", author: "Admin", tags: ["system","maintenance"] },
  { id: "NL-007", subject: "GoDigiMarket Weekly Digest — April 2026 #4",       preheader: "April wrap-up: record orders, new reporters onboarded.",                    status: "archived",  audience: "all",         recipientCount: 11940, openRate: 36.2, clickRate: 5.8,  scheduledAt: "2026-04-28 08:00", sentAt: "2026-04-28 08:00", createdAt: "2026-04-26", author: "Admin", tags: ["digest","weekly"] },
  { id: "NL-008", subject: "GoDigiMarket Weekly Digest — May 2026 #1",         preheader: "Five stories from six time zones: the best of the past week.",              status: "archived",  audience: "all",         recipientCount: 12100, openRate: 39.7, clickRate: 7.1,  scheduledAt: "2026-05-05 08:00", sentAt: "2026-05-05 08:00", createdAt: "2026-05-03", author: "Admin", tags: ["digest","weekly"] },
];

interface TaxonomyRow {
  id: string; name: string; slug: string;
  type: "category" | "tag" | "region" | "topic";
  parent: string | null; count: number; description: string;
  createdAt: string;
}
const TAXONOMIES: TaxonomyRow[] = [
  { id: "TX-001", name: "Politics",      slug: "politics",       type: "category", parent: null,       count: 84,  description: "Political events, elections, governance",       createdAt: "2025-01-12" },
  { id: "TX-002", name: "Environment",   slug: "environment",    type: "category", parent: null,       count: 67,  description: "Climate, natural disasters, ecology",            createdAt: "2025-01-12" },
  { id: "TX-003", name: "Conflict",      slug: "conflict",       type: "category", parent: null,       count: 112, description: "Wars, armed conflicts, displacement",             createdAt: "2025-01-12" },
  { id: "TX-004", name: "Business",      slug: "business",       type: "category", parent: null,       count: 45,  description: "Markets, economy, companies",                    createdAt: "2025-01-13" },
  { id: "TX-005", name: "Culture",       slug: "culture",        type: "category", parent: null,       count: 38,  description: "Arts, entertainment, social trends",             createdAt: "2025-01-13" },
  { id: "TX-006", name: "Science",       slug: "science",        type: "category", parent: null,       count: 29,  description: "Research, space, medicine, technology",          createdAt: "2025-01-14" },
  { id: "TX-007", name: "Elections",     slug: "elections",      type: "topic",    parent: "TX-001",   count: 41,  description: "National and local election coverage",           createdAt: "2025-02-03" },
  { id: "TX-008", name: "Climate Change",slug: "climate-change", type: "topic",    parent: "TX-002",   count: 33,  description: "Long-term climate reporting",                    createdAt: "2025-02-03" },
  { id: "TX-009", name: "Flood",         slug: "flood",          type: "tag",      parent: null,       count: 18,  description: "Flood and inundation events",                    createdAt: "2025-03-07" },
  { id: "TX-010", name: "Wildfire",      slug: "wildfire",       type: "tag",      parent: null,       count: 12,  description: "Forest and urban fire events",                   createdAt: "2025-03-07" },
  { id: "TX-011", name: "Ceasefire",     slug: "ceasefire",      type: "tag",      parent: null,       count: 9,   description: "Ceasefire negotiations and agreements",          createdAt: "2025-03-15" },
  { id: "TX-012", name: "Europe",        slug: "europe",         type: "region",   parent: null,       count: 156, description: "European continent coverage",                    createdAt: "2025-01-12" },
  { id: "TX-013", name: "Middle East",   slug: "middle-east",    type: "region",   parent: null,       count: 98,  description: "Middle East and North Africa",                   createdAt: "2025-01-12" },
  { id: "TX-014", name: "Sub-Saharan Africa", slug: "sub-saharan-africa", type: "region", parent: null, count: 74, description: "Sub-Saharan Africa coverage",                    createdAt: "2025-01-13" },
  { id: "TX-015", name: "Central Asia",  slug: "central-asia",   type: "region",   parent: null,       count: 31,  description: "Kazakhstan, Uzbekistan, and neighbouring states", createdAt: "2025-02-18" },
];

interface ReportageRow {
  id: string; title: string; reporter: string; category: string;
  status: ReportageStatus; price: number; duration: string;
  format: "Video" | "Photo" | "Audio"; date: string; buyer: string | null;
  img: string;
}
const REPORTAGES: ReportageRow[] = [
  { id: "RPT-2241", title: "Flash Floods in Aktobe Region", reporter: "Daniyar Seitkali", category: "Environment", status: "delivered", price: 180, duration: "3:42", format: "Video", date: "2026-05-22", buyer: "Takeshi Morita", img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2240", title: "Presidential Campaign Rally — Milan", reporter: "Elena Marchetti", category: "Politics", status: "approved", price: 320, duration: "5:15", format: "Video", date: "2026-05-21", buyer: null, img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2239", title: "Street Art Festival Porto 2026", reporter: "Elena Marchetti", category: "Culture", status: "delivered", price: 120, duration: "18 photos", format: "Photo", date: "2026-05-19", buyer: "Carl Henriksson", img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2238", title: "Dakar Port Workers Strike — Day 3", reporter: "Amara Diallo", category: "Labor", status: "reviewing", price: 210, duration: "4:08", format: "Video", date: "2026-05-18", buyer: null, img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2237", title: "Tech Startup Ecosystem in Kyiv", reporter: "Sasha Kovalenko", category: "Business", status: "rejected", price: 150, duration: "24 photos", format: "Photo", date: "2026-05-15", buyer: null, img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2236", title: "Monsoon Impact on Kolkata Slums", reporter: "Priya Nambiar", category: "Social", status: "submitted", price: 280, duration: "6:22", format: "Video", date: "2026-05-13", buyer: null, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2235", title: "Lagos Startup Pitch Day", reporter: "Amara Diallo", category: "Business", status: "delivered", price: 150, duration: "8:10", format: "Video", date: "2026-05-10", buyer: "Priya Nambiar", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2234", title: "Sakura Season — Kyoto Gardens", reporter: "Takeshi Morita", category: "Culture", status: "approved", price: 95, duration: "32 photos", format: "Photo", date: "2026-05-08", buyer: null, img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=240&fit=crop&auto=format" },
  { id: "RPT-2233", title: "Stockholm Climate Summit Opening", reporter: "Carl Henriksson", category: "Environment", status: "draft", price: 400, duration: "12:00", format: "Video", date: "2026-05-07", buyer: null, img: "https://images.unsplash.com/photo-1566384359565-d3c0b36b5f82?w=400&h=240&fit=crop&auto=format" },
];

interface DeliveryRow {
  id: string; reportage: string; reporter: string; customer: string;
  files: number; size: string; avScan: AvScan; status: DeliveryStatus;
  checksum: string; created: string; expires: string;
}
const DELIVERIES: DeliveryRow[] = [
  { id: "DLV-1091", reportage: "Flash Floods in Aktobe Region", reporter: "Daniyar Seitkali", customer: "Takeshi Morita", files: 3, size: "1.2 GB", avScan: "clean", status: "ready", checksum: "sha256:a3f9d2e1...8b2c", created: "2026-05-22 15:01", expires: "2026-06-05 15:01" },
  { id: "DLV-1090", reportage: "Street Art Festival Porto 2026", reporter: "Elena Marchetti", customer: "Carl Henriksson", files: 18, size: "840 MB", avScan: "clean", status: "downloaded", checksum: "sha256:c7e2b3f4...3d9a", created: "2026-05-19 11:30", expires: "2026-06-02 11:30" },
  { id: "DLV-1089", reportage: "Offshore Wind Farm Tour", reporter: "Carl Henriksson", customer: "Priya Nambiar", files: 1, size: "2.4 GB", avScan: "scanning", status: "scanning", checksum: "—", created: "2026-05-24 09:15", expires: "—" },
  { id: "DLV-1088", reportage: "Urban Planning Protest Hamburg", reporter: "Elena Marchetti", customer: "Carl Henriksson", files: 2, size: "580 MB", avScan: "clean", status: "expired", checksum: "sha256:e8f4a1b2...1a7b", created: "2026-04-24 14:00", expires: "2026-05-08 14:00" },
];

const WALLET_TXS = [
  { id: "TXN-4491", desc: "Deposit via Wire Transfer", amount: +5000.00, balance: 12400.00, date: "2026-05-23", status: "completed" },
  { id: "TXN-4489", desc: "Purchase: Street Art Festival Porto", amount: -120.00, balance: 7400.00, date: "2026-05-22", status: "completed" },
  { id: "TXN-4485", desc: "Purchase refunded: Urban Planning Protest", amount: +180.00, balance: 7520.00, date: "2026-05-20", status: "refunded" },
  { id: "TXN-4480", desc: "Deposit via Credit Card", amount: +2000.00, balance: 7340.00, date: "2026-05-15", status: "completed" },
  { id: "TXN-4472", desc: "Purchase: Flash Floods — Aktobe", amount: -180.00, balance: 5340.00, date: "2026-05-10", status: "completed" },
];

// ── Status Styles ──────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  completed:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  delivered:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  downloaded: "bg-emerald-50 text-emerald-700 border-emerald-200",
  clean:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  pending:    "bg-amber-50 text-amber-700 border-amber-200",
  reviewing:  "bg-amber-50 text-amber-700 border-amber-200",
  suspended:  "bg-amber-50 text-amber-700 border-amber-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  approved:   "bg-blue-50 text-blue-700 border-blue-200",
  submitted:  "bg-sky-50 text-sky-700 border-sky-200",
  ready:      "bg-sky-50 text-sky-700 border-sky-200",
  failed:     "bg-red-50 text-red-700 border-red-200",
  rejected:   "bg-red-50 text-red-700 border-red-200",
  banned:     "bg-red-50 text-red-700 border-red-200",
  refunded:   "bg-violet-50 text-violet-700 border-violet-200",
  scanning:   "bg-violet-50 text-violet-700 border-violet-200",
  draft:      "bg-slate-100 text-slate-600 border-slate-200",
  expired:    "bg-slate-100 text-slate-500 border-slate-200",
  fulfilled:  "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ── Primitive Components ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border whitespace-nowrap", s)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function Chip({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "gray" | "green" | "red" | "amber" | "sky" }) {
  const styles = {
    blue:  "bg-blue-50 text-blue-700 border-blue-200",
    gray:  "bg-slate-100 text-slate-600 border-slate-200",
    green: "bg-emerald-50 text-emerald-700 border-emerald-200",
    red:   "bg-red-50 text-red-700 border-red-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    sky:   "bg-sky-50 text-sky-700 border-sky-200",
  };
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded border whitespace-nowrap", styles[color])}>
      {children}
    </span>
  );
}

interface StatCardProps {
  label: string; value: string; sub?: string;
  icon: React.ElementType; trend?: string; trendUp?: boolean;
}
function StatCard({ label, value, sub, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</span>
        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground font-mono">{value}</div>
      {(sub || trend) && (
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={cn("flex items-center gap-0.5 text-xs font-medium", trendUp ? "text-emerald-600" : "text-red-500")}>
              {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend}
            </span>
          )}
          {sub && <span className="text-xs text-muted-foreground">{sub}</span>}
        </div>
      )}
    </div>
  );
}

function TH({ children, sortable, active, onClick }: { children: React.ReactNode; sortable?: boolean; active?: boolean; onClick?: () => void }) {
  return (
    <th
      className={cn("text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2.5 whitespace-nowrap border-b border-border", sortable && "cursor-pointer select-none hover:text-foreground")}
      onClick={onClick}
    >
      <span className="flex items-center gap-1">
        {children}
        {sortable && active && <SortAsc className="w-3 h-3 text-primary" />}
      </span>
    </th>
  );
}

function TD({ children, mono }: { children: React.ReactNode; mono?: boolean }) {
  return (
    <td className={cn("px-3 py-2.5 text-sm border-b border-border/60 align-middle", mono && "font-mono text-[12px]")}>
      {children}
    </td>
  );
}

function SearchInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-8 pr-3 py-1.5 text-sm bg-white border border-border rounded-md w-56 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
      />
    </div>
  );
}

function Btn({
  children, variant = "primary", size = "sm", disabled, onClick, icon: Icon, full, className
}: {
  children?: React.ReactNode; variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "xs" | "sm" | "md"; disabled?: boolean; onClick?: () => void;
  icon?: React.ElementType; full?: boolean; className?: string;
}) {
  const base = "inline-flex items-center justify-center gap-1.5 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";
  const sizes = { xs: "px-2 py-1 text-[12px]", sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm" };
  const variants = {
    primary:     "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/30",
    secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border focus:ring-primary/20",
    ghost:       "text-muted-foreground hover:text-foreground hover:bg-secondary focus:ring-primary/20",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive/30",
    outline:     "border border-border text-foreground bg-white hover:bg-secondary focus:ring-primary/20",
  };
  return (
    <button
      onClick={onClick} disabled={disabled}
      className={cn(base, sizes[size], variants[variant], full && "w-full", className)}
    >
      {Icon && <Icon className={size === "xs" ? "w-3 h-3" : "w-3.5 h-3.5"} />}
      {children}
    </button>
  );
}

// ── Nav Config ─────────────────────────────────────────────────────────────────
type NavItem = { label: string; icon: React.ElementType; screen: Screen };
type NavSection = { title?: string; items: NavItem[] };

const NAV_CONFIG: Record<Role, NavSection[]> = {
  admin: [
    { items: [
      { label: "Dashboard", icon: LayoutDashboard, screen: "admin-dashboard" },
      { label: "Notifications", icon: Bell, screen: "notifications-list" },
    ]},
    { title: "People", items: [
      { label: "Users",          icon: Users,       screen: "admin-users" },
      { label: "New User",       icon: Plus,        screen: "admin-user-new" },
      { label: "Reporters",      icon: Camera,      screen: "admin-reporters-list" },
      { label: "Subscriptions",  icon: CreditCard,  screen: "admin-subscriptions" },
      { label: "Devices",        icon: Monitor,     screen: "admin-devices" },
    ]},
    { title: "Content", items: [
      { label: "Reportages", icon: FileText, screen: "admin-reportages" },
      { label: "Deliveries", icon: Truck, screen: "admin-deliveries" },
      { label: "Requests", icon: MessageSquare, screen: "admin-requests" },
      { label: "Disputes", icon: AlertTriangle, screen: "admin-disputes" },
    ]},
    { title: "Financial", items: [
      { label: "Notifications",     icon: Bell,         screen: "admin-notifications" },
      { label: "Transactions",      icon: DollarSign,   screen: "admin-transactions" },
      { label: "Wallet Detail",     icon: Wallet,       screen: "admin-wallet-detail" },
      { label: "Platform Earnings", icon: TrendingUp,   screen: "admin-platform-earnings" },
      { label: "User Activity",     icon: Activity,     screen: "admin-user-activity" },
      { label: "Withdrawals",       icon: ArrowUpRight, screen: "admin-withdrawals" },
      { label: "Order Detail",      icon: Package,      screen: "admin-order-detail" },
    ]},
    { title: "Monitoring", items: [
      { label: "Error Inbox",    icon: AlertTriangle, screen: "admin-error-inbox" },
      { label: "Logging",        icon: Terminal,      screen: "admin-logging-errors" },
    ]},
    { title: "Feeds", items: [
      { label: "Feeds",          icon: Inbox,         screen: "admin-feeds" },
      { label: "Feed Sources",   icon: Globe,         screen: "admin-feed-sources" },
      { label: "Source Entries", icon: FileText,      screen: "admin-feed-source-entries" },
      { label: "Entry Detail",   icon: BookOpen,      screen: "admin-feed-entry-detail" },
    ]},
    { title: "CMS", items: [
      { label: "Global Settings",  icon: Settings,   screen: "admin-cms-settings" },
      { label: "Settings History", icon: Clock,      screen: "admin-cms-settings-history" },
      { label: "Articles",         icon: Newspaper,  screen: "admin-cms-articles" },
      { label: "Basic Pages",      icon: FileText,   screen: "admin-cms-pages" },
      { label: "Public Menus",     icon: List,       screen: "admin-cms-menus" },
      { label: "Menu Items",       icon: Hash,       screen: "admin-cms-menu-items" },
      { label: "Newsletters",      icon: Mail,       screen: "admin-newsletters" },
      { label: "New Newsletter",   icon: Plus,       screen: "admin-newsletter-new" },
    ]},
    { title: "Taxonomy", items: [
      { label: "Taxonomy",       icon: Tag,           screen: "admin-taxonomy-list" },
      { label: "New Taxonomy",   icon: Plus,          screen: "admin-taxonomy-new" },
    ]},
    { title: "Platform", items: [
      { label: "Settings",       icon: Settings,      screen: "admin-settings" },
    ]},
    { items: [{ label: "Design System", icon: Layers, screen: "design-system" }] },
  ],
  reporter: [
    { items: [
      { label: "Dashboard",       icon: LayoutDashboard, screen: "reporter-dashboard" },
      { label: "My Reportages",   icon: FileText,        screen: "reporter-reportages" },
      { label: "Requests",        icon: MessageSquare,   screen: "reporter-request-responses" },
      { label: "Deliveries",      icon: Truck,           screen: "reporter-deliveries" },
      { label: "Earnings",        icon: DollarSign,      screen: "reporter-earnings" },
      { label: "Wallet",          icon: Wallet,          screen: "wallet" },
    ]},
    { title: "Portfolio", items: [
      { label: "Photo",           icon: Camera,          screen: "reporter-portfolio-photo" },
      { label: "Video",           icon: Activity,        screen: "reporter-portfolio-video" },
      { label: "Audio",           icon: Inbox,           screen: "reporter-portfolio-audio" },
      { label: "Upload Content",  icon: Plus,            screen: "create-reportage" },
    ]},
    { title: "Account", items: [
      { label: "My Profile",      icon: Users,           screen: "reporter-profile-edit" },
      { label: "Devices",         icon: Shield,          screen: "reporter-devices" },
      { label: "Notifications",   icon: Bell,            screen: "notifications-list" },
      { label: "Subscription",    icon: CreditCard,      screen: "subscription-plans" },
      { label: "Design System",   icon: Layers,          screen: "design-system" },
    ]},
  ],
  customer: [
    { items: [
      { label: "Dashboard", icon: LayoutDashboard, screen: "customer-dashboard" },
      { label: "Purchases", icon: Package, screen: "customer-purchases" },
      { label: "My Requests", icon: MessageSquare, screen: "customer-requests" },
      { label: "Deliveries", icon: Truck, screen: "customer-deliveries" },
      { label: "Wallet", icon: Wallet, screen: "wallet" },
    ]},
    { title: "Account", items: [
      { label: "My Profile", icon: Users, screen: "user-profile" },
      { label: "Notifications", icon: Bell, screen: "notifications-list" },
      { label: "My Content", icon: Package, screen: "my-content-list" },
      { label: "Bookmarks", icon: Bookmark, screen: "bookmarks" },
      { label: "Subscription", icon: CreditCard, screen: "subscription-plans" },
      { label: "Design System", icon: Layers, screen: "design-system" },
    ]},
  ],
  public: [
    { items: [
      { label: "Marketplace", icon: Globe, screen: "marketplace" },
      { label: "Reportages", icon: Camera, screen: "reportages-map" },
      { label: "Reporters", icon: Users, screen: "reporters-map" },
      { label: "Requests", icon: MessageSquare, screen: "requests-map" },
      { label: "Articles", icon: Newspaper, screen: "articles-list" },
      { label: "Feeds", icon: Zap, screen: "feeds-map" },
      { label: "About", icon: Info, screen: "cms-page" },
      { label: "Sign In", icon: LogOut, screen: "login" },
      { label: "Design System", icon: Layers, screen: "design-system" },
    ]},
  ],
};

// ── Sidebar ────────────────────────────────────────────────────────────────────
function Sidebar({ role, currentScreen, onNavigate, onRoleChange, collapsed, onToggle }: {
  role: Role; currentScreen: Screen; onNavigate: (s: Screen) => void;
  onRoleChange: (r: Role) => void; collapsed: boolean; onToggle: () => void;
}) {
  const AVATARS: Record<Role, string> = { admin: "AD", reporter: "ER", customer: "TM", public: "GU" };
  const NAMES: Record<Role, string> = { admin: "Admin User", reporter: "Elena Marchetti", customer: "Takeshi Morita", public: "Guest" };
  const { open: mobileOpen, close: mobileClose } = useContext(MobileMenuCtx);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) =>
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const handleNavigate = (s: Screen) => { onNavigate(s); mobileClose(); };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={mobileClose}
        />
      )}
    <aside className={cn(
      "flex flex-col bg-white border-r border-border transition-all duration-200 flex-shrink-0 z-50",
      // Mobile: fixed overlay
      "fixed inset-y-0 left-0 md:relative md:translate-x-0",
      mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0",
      // Desktop width
      collapsed ? "md:w-12" : "w-56"
    )}>
      {/* Brand */}
      <div className="h-11 flex items-center px-3 border-b border-border gap-2.5 flex-shrink-0">
        <div className="w-6 h-6 bg-primary rounded flex items-center justify-center flex-shrink-0">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        {!collapsed && <span className="font-semibold text-sm text-foreground tracking-tight truncate">GoDigiMarket</span>}
        <button onClick={onToggle} className="ml-auto p-0.5 rounded hover:bg-muted text-muted-foreground flex-shrink-0">
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Role switcher */}
      {!collapsed && (
        <div className="px-2.5 py-2 border-b border-border">
          <select
            value={role}
            onChange={e => onRoleChange(e.target.value as Role)}
            className="w-full text-xs py-1.5 px-2 border border-border rounded-md bg-secondary text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="admin">Admin</option>
            <option value="reporter">Reporter</option>
            <option value="customer">Customer</option>
            <option value="public">Public</option>
          </select>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1.5 [scrollbar-width:none]">
        {NAV_CONFIG[role].map((section, si) => {
          const sectionKey = section.title ?? `__untitled_${si}`;
          const isSectionCollapsed = section.title ? !!collapsedSections[sectionKey] : false;
          return (
            <div key={si} className="mb-0.5">
              {section.title && !collapsed && (
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center gap-1.5 px-3 pt-2 pb-0.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
                >
                  <span className="flex-1 text-left">{section.title}</span>
                  <ChevronRight className={cn(
                    "w-3 h-3 flex-shrink-0 transition-transform duration-150",
                    !isSectionCollapsed && "rotate-90"
                  )} />
                </button>
              )}
              {!isSectionCollapsed && section.items.map(item => {
                const Icon = item.icon;
                const active = currentScreen === item.screen;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavigate(item.screen)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-1.5 text-sm transition-colors",
                      collapsed ? "justify-center" : "",
                      active
                        ? "bg-primary/8 text-primary font-medium border-r-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
              {!collapsed && si < NAV_CONFIG[role].length - 1 && section.title && !isSectionCollapsed && (
                <div className="mx-3 my-1 border-t border-border/50" />
              )}
            </div>
          );
        })}
      </nav>

      {/* User footer */}
      {!collapsed && (
        <div className="border-t border-border p-2.5 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-semibold flex-shrink-0">
            {AVATARS[role]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-foreground truncate">{NAMES[role]}</div>
            <div className="text-[10px] text-muted-foreground capitalize">{role}</div>
          </div>
          <button className="p-1 rounded hover:bg-muted text-muted-foreground">
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      )}
    </aside>
    </>
  );
}

// ── Top Bar ────────────────────────────────────────────────────────────────────
function TopBar({ breadcrumbs }: { breadcrumbs: string[] }) {
  const { toggle } = useContext(MobileMenuCtx);
  return (
    <header className="h-11 bg-white border-b border-border flex items-center px-3 sm:px-4 gap-2 sm:gap-3 flex-shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={toggle}
        className="md:hidden p-1.5 -ml-1 rounded-md hover:bg-secondary text-muted-foreground flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="w-4 h-4" />
      </button>
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-sm text-muted-foreground flex-1 min-w-0 overflow-hidden">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0 text-border" />}
            <span className={cn(
              "truncate text-xs sm:text-sm",
              i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer hidden sm:block",
              i === breadcrumbs.length - 1 && "block"
            )}>
              {crumb}
            </span>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text" placeholder="Search…"
            className="pl-8 pr-3 py-1.5 text-sm bg-secondary border border-border rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button className="relative p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </button>
        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-semibold cursor-pointer flex-shrink-0">
          AD
        </div>
      </div>
    </header>
  );
}

// ── Page Shell ─────────────────────────────────────────────────────────────────
function Page({ title, breadcrumbs, actions, children }: {
  title: string; breadcrumbs: string[]; actions?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TopBar breadcrumbs={breadcrumbs} />
      <div className="flex-1 overflow-y-auto [scrollbar-width:none] hover:[scrollbar-width:thin]">
        <div className="p-3 sm:p-4">
          {actions ? (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <h1 className="text-base font-semibold text-foreground">{title}</h1>
              <div className="flex items-center gap-2">{actions}</div>
            </div>
          ) : (
            <h1 className="text-base font-semibold text-foreground mb-4">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────────
function Pagination({ total, shown }: { total: string; shown: number }) {
  return (
    <div className="p-3 border-t border-border flex items-center justify-between">
      <span className="text-xs text-muted-foreground">Showing {shown} of {total}</span>
      <div className="flex items-center gap-0.5">
        <Btn variant="ghost" size="xs" icon={ChevronLeft} />
        {[1, 2, 3, "…", "last"].map((p, i) => (
          <button key={i} className={cn(
            "w-7 h-7 text-xs rounded flex items-center justify-center transition-colors",
            p === 1 ? "bg-primary text-white" : "hover:bg-secondary text-muted-foreground"
          )}>{p}</button>
        ))}
        <Btn variant="ghost" size="xs" icon={ChevronRight} />
      </div>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={cn(
      "rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center flex-shrink-0",
      size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs"
    )}>
      {initials}
    </div>
  );
}

function ScreenFrame({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-secondary/40 flex-shrink-0">
        <span className="text-xs font-semibold text-foreground truncate">{title}</span>
        <span className="text-[10px] text-muted-foreground font-mono whitespace-nowrap ml-2">{label}</span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SegCtrl({ options }: { options: string[] }) {
  const [sel, setSel] = useState(0);
  return (
    <div className="inline-flex items-center bg-secondary rounded-md p-0.5 gap-0.5">
      {options.map((o, i) => (
        <button
          key={o}
          onClick={() => setSel(i)}
          className={cn(
            "px-3 py-1 text-xs font-medium rounded transition-all",
            sel === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          )}
        >{o}</button>
      ))}
    </div>
  );
}

// ── SCREEN: Design System ──────────────────────────────────────────────────────
function DesignSystemScreen() {
  const [tab, setTab] = useState<"colors" | "type" | "buttons" | "forms" | "tables" | "states" | "spacing" | "cards" | "navigation" | "modals" | "dropdowns">("spacing");

  // Modal states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Dropdown states
  const [actionOpen, setActionOpen] = useState(false);
  const [contextOpen, setContextOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const [ddValue, setDdValue] = useState("All categories");
  const [navActive, setNavActive] = useState("reporter-reportages");
  const [navTab, setNavTab] = useState(0);
  const [stateKind, setStateKind] = useState<"empty" | "loading" | "error" | "forbidden">("empty");

  const ALL_TABS = ["spacing", "cards", "navigation", "modals", "dropdowns", "colors", "type", "buttons", "forms", "tables", "states"] as const;

  const SPACING_SCALE = [
    { token: "0",   px: 0  }, { token: "0.5", px: 2  }, { token: "1",  px: 4  },
    { token: "1.5", px: 6  }, { token: "2",   px: 8  }, { token: "3",  px: 12 },
    { token: "4",   px: 16 }, { token: "5",   px: 20 }, { token: "6",  px: 24 },
    { token: "8",   px: 32 }, { token: "10",  px: 40 }, { token: "12", px: 48 },
    { token: "14",  px: 56 }, { token: "16",  px: 64 }, { token: "20", px: 80 },
    { token: "24",  px: 96 },
  ];

  const CATEGORIES = ["All categories", "Environment", "Politics", "Culture", "Technology", "Conflict", "Economy"];

  const NAV_ITEMS = [
    { id: "reporter-dashboard",   icon: LayoutDashboard, label: "Dashboard" },
    { id: "reporter-reportages",  icon: FileText,        label: "My Reportages", badge: "12" },
    { id: "reporter-earnings",    icon: DollarSign,      label: "Earnings" },
    { id: "reporter-requests",    icon: Inbox,           label: "Requests", badge: "3" },
    { id: "reporter-devices",     icon: Server,          label: "Devices" },
    { id: "user-profile",         icon: Users,           label: "Profile" },
  ];

  return (
    <Page title="Design System" breadcrumbs={["GoDigiMarket", "Design System"]}>

      {/* ── Modals (fixed, escape overflow) ─────────────────────────────────── */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setConfirmOpen(false)}>
          <div className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="text-base font-semibold mb-1">Delete reportage?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">RPT-2240 "Flash Floods in Aktobe" will be permanently removed. This cannot be undone.</p>
            </div>
            <div className="px-6 pb-6 flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={Trash2} onClick={() => setConfirmOpen(false)}>Delete</Btn>
            </div>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setFormOpen(false)}>
          <div className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-semibold">Edit reporter</h2>
              <button onClick={() => setFormOpen(false)} className="p-1 rounded-md hover:bg-secondary text-muted-foreground transition-colors"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="px-6 py-4 space-y-3">
              {[
                { label: "Display name", type: "text", value: "Elena Marchetti" },
                { label: "Email", type: "email", value: "e.marchetti@medialab.it" },
                { label: "Country", type: "text", value: "Italy" },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input type={f.type} defaultValue={f.value} className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1">Role</label>
                <select className="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Reporter</option><option>Customer</option><option>Admin</option>
                </select>
              </div>
            </div>
            <div className="px-6 pb-4 flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setFormOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={CheckCircle} onClick={() => setFormOpen(false)}>Save changes</Btn>
            </div>
          </div>
        </div>
      )}

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setPreviewOpen(false)}>
          <div className="bg-card rounded-xl shadow-2xl border border-border w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Reportage Preview</h2>
                <p className="text-xs text-muted-foreground">RPT-2240 · <span className="text-emerald-600 font-medium">Approved</span></p>
              </div>
              <button onClick={() => setPreviewOpen(false)} className="p-1 rounded-md hover:bg-secondary text-muted-foreground transition-colors"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&h=240&fit=crop&auto=format" alt="Flood reportage" className="w-full h-44 object-cover rounded-lg mb-4 bg-muted" />
              <h3 className="text-base font-semibold mb-1">Flash Floods in Aktobe Region</h3>
              <p className="text-xs text-muted-foreground mb-3">Filed by Daniyar Seitkali · 2026-05-20 · Video · 1.2 GB · $290</p>
              <p className="text-sm text-muted-foreground leading-relaxed">On-ground video documentation of the flood event across three districts. GPS metadata attached, sources verified. Includes 4K footage, aerial drone shots, and field interviews.</p>
            </div>
            <div className="px-6 pb-6 flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setPreviewOpen(false)}>Close</Btn>
              <Btn variant="primary" size="sm" icon={Download}>Download</Btn>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-0.5 border-b border-border mb-5 -mt-1 overflow-x-auto [scrollbar-width:none]">
        {ALL_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-3 py-2 text-sm capitalize border-b-2 -mb-px transition-colors whitespace-nowrap",
              tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >{t}</button>
        ))}
      </div>

      {/* ── SPACING ─────────────────────────────────────────────────────────── */}
      {tab === "spacing" && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Scale */}
            <div className="lg:col-span-2">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Spacing Scale</h3>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {SPACING_SCALE.map(({ token, px }) => (
                  <div key={token} className="flex items-center gap-3 px-4 py-2 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors group">
                    <span className="w-14 font-mono text-xs text-muted-foreground text-right flex-shrink-0 group-hover:text-foreground transition-colors">{px}px</span>
                    <div className="flex-1 h-5 flex items-center">
                      <div
                        className="h-3.5 bg-primary/20 border-r-2 border-primary rounded-sm transition-all"
                        style={{ width: px === 0 ? 2 : `${Math.min((px / 96) * 100, 100)}%`, minWidth: px > 0 ? 4 : 2 }}
                      />
                    </div>
                    <code className="w-20 font-mono text-xs text-primary flex-shrink-0">space-{token}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {/* Border Radius */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Border Radius</h3>
                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  {[
                    { label: "rounded-sm",   r: "rounded-sm",   px: "2px"  },
                    { label: "rounded",      r: "rounded",      px: "4px"  },
                    { label: "rounded-md",   r: "rounded-md",   px: "6px"  },
                    { label: "rounded-lg",   r: "rounded-lg",   px: "8px"  },
                    { label: "rounded-xl",   r: "rounded-xl",   px: "12px" },
                    { label: "rounded-2xl",  r: "rounded-2xl",  px: "16px" },
                    { label: "rounded-full", r: "rounded-full", px: "9999" },
                  ].map(({ label, r, px }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 bg-primary/20 border border-primary/30 flex-shrink-0", r)} />
                      <div>
                        <code className="block text-xs font-mono text-foreground">{label}</code>
                        <span className="text-[10px] text-muted-foreground">{px}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gap & Padding demos */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Padding</h3>
              <div className="bg-card border border-border rounded-lg p-4 space-y-2.5">
                {["p-2", "p-3", "p-4", "p-5", "p-6", "p-8"].map(cls => (
                  <div key={cls} className="flex items-center gap-3">
                    <code className="w-14 text-xs font-mono text-muted-foreground">{cls}</code>
                    <div className="bg-primary/10 border border-primary/20 rounded">
                      <div className={cn("bg-primary/25 rounded text-[10px] font-mono text-primary leading-none", cls)}>box</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Gap</h3>
              <div className="bg-card border border-border rounded-lg p-4 space-y-2.5">
                {["gap-1", "gap-2", "gap-3", "gap-4", "gap-6", "gap-8"].map(cls => (
                  <div key={cls} className="flex items-center gap-3">
                    <code className="w-14 text-xs font-mono text-muted-foreground">{cls}</code>
                    <div className={cn("flex", cls)}>
                      {[1, 2, 3, 4].map(n => (
                        <div key={n} className="w-4 h-4 bg-primary/20 border border-primary/30 rounded-sm" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CARDS ───────────────────────────────────────────────────────────── */}
      {tab === "cards" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Stat Cards</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatCard label="Platform Revenue" value="$31,200" trend="+8.7%" trendUp icon={TrendingUp} sub="this month" />
              <StatCard label="Active Users" value="4,821" trend="+12.3%" trendUp icon={Users} sub="vs last month" />
              <StatCard label="New Reportages" value="243" trend="+18 new" trendUp icon={FileText} sub="this month" />
              <StatCard label="Open Disputes" value="7" trend="-3" trendUp={false} icon={AlertTriangle} sub="need review" />
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Media Cards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { img: "photo-1504711434969-e33886168f5c", title: "Flash Floods in Aktobe Region", reporter: "Daniyar Seitkali", price: "$290", format: "Video", status: "approved" as const },
                { img: "photo-1586348943529-beaae6c28db9", title: "Vienna Tech Forum 2026", reporter: "Klaus Weber", price: "$180", format: "Photo", status: "reviewing" as const },
                { img: "photo-1542281286-9e0a16bb7366", title: "Westminster Protests — Day 3", reporter: "Sofia Brennan", price: "$450", format: "Video", status: "delivered" as const },
              ].map(r => (
                <div key={r.title} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-${r.img}?w=400&h=200&fit=crop&auto=format`} alt={r.title} className="w-full h-36 object-cover bg-muted group-hover:scale-[1.02] transition-transform duration-300" />
                    <div className="absolute top-2 left-2"><Chip color={r.format === "Video" ? "blue" : "amber"}>{r.format}</Chip></div>
                    <div className="absolute top-2 right-2"><StatusBadge status={r.status} /></div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium leading-snug mb-1 line-clamp-2">{r.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{r.reporter}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-foreground">{r.price}</span>
                      <Btn variant="primary" size="xs">Purchase</Btn>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">User Cards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { name: "Elena Marchetti", role: "Reporter", country: "Italy", reportages: 47, balance: "$2,840", status: "active" as const },
                { name: "Takeshi Morita",  role: "Customer", country: "Japan", reportages: 0,  balance: "$12,400", status: "active" as const },
                { name: "Sasha Kovalenko", role: "Reporter", country: "Ukraine", reportages: 18, balance: "$340", status: "suspended" as const },
              ].map(u => (
                <div key={u.name} className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} size="md" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{u.name}</p>
                      <p className="text-xs text-muted-foreground">{u.country}</p>
                    </div>
                    <StatusBadge status={u.status} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Role</p>
                      <Chip color={u.role === "Reporter" ? "blue" : "gray"}>{u.role}</Chip>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Reportages</p>
                      <p className="text-sm font-semibold">{u.reportages}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Balance</p>
                      <p className="text-sm font-semibold font-mono">{u.balance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">List Item Cards</h3>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              {[
                { id: "TXN-4491", user: "Elena Marchetti", type: "withdrawal", amount: "$320", status: "completed" as TxStatus, date: "2026-05-23" },
                { id: "TXN-4490", user: "Takeshi Morita",  type: "deposit",    amount: "$1,200", status: "completed" as TxStatus, date: "2026-05-22" },
                { id: "TXN-4489", user: "Amara Diallo",    type: "refund",     amount: "$90",  status: "pending" as TxStatus,   date: "2026-05-21" },
                { id: "TXN-4488", user: "Carl Henriksson", type: "deposit",    amount: "$450", status: "processing" as TxStatus, date: "2026-05-21" },
              ].map((tx, i) => (
                <div key={tx.id} className={cn("flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors", i % 2 === 1 ? "bg-secondary/10" : "")}>
                  <code className="text-xs font-mono text-muted-foreground w-20 flex-shrink-0">{tx.id}</code>
                  <span className="text-sm font-medium flex-1 min-w-0 truncate">{tx.user}</span>
                  <Chip color={tx.type === "deposit" ? "green" : tx.type === "withdrawal" ? "amber" : "blue"}>{tx.type}</Chip>
                  <code className="text-sm font-mono font-medium w-16 text-right">{tx.amount}</code>
                  <StatusBadge status={tx.status} />
                  <code className="text-xs font-mono text-muted-foreground w-20 text-right hidden sm:block">{tx.date}</code>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      {tab === "navigation" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Sidebar nav */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Sidebar Navigation</h3>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-3 py-2 border-b border-border bg-secondary/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">GoDigiMarket</span>
                </div>
              </div>
              <div className="p-2 space-y-0.5">
                <p className="px-2 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Reporter</p>
                {NAV_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setNavActive(item.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                      navActive === item.id
                        ? "bg-primary text-white font-medium"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "text-[10px] font-semibold rounded-full px-1.5 py-0.5 leading-none",
                        navActive === item.id ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                      )}>{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Breadcrumbs */}
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mt-5 mb-3">Breadcrumbs</h3>
            <div className="space-y-2">
              {[
                ["Admin", "Users"],
                ["Admin", "Reportages", "RPT-2240"],
                ["Reporter", "Earnings", "May 2026"],
              ].map((crumbs, i) => (
                <div key={i} className="bg-card border border-border rounded-md px-3 py-2 flex items-center gap-1 text-xs">
                  {crumbs.map((c, j) => (
                    <span key={j} className="flex items-center gap-1">
                      {j > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                      <span className={j === crumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground cursor-pointer"}>{c}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            {/* Tab bar */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Tab Bar</h3>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="border-b border-border px-1">
                  <div className="flex">
                    {["Overview", "Transactions", "Devices", "Settings"].map((t, i) => (
                      <button
                        key={t}
                        onClick={() => setNavTab(i)}
                        className={cn(
                          "px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors",
                          navTab === i ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                      >{t}</button>
                    ))}
                  </div>
                </div>
                <div className="p-4 min-h-[80px] flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Content for <strong>{["Overview", "Transactions", "Devices", "Settings"][navTab]}</strong></p>
                </div>
              </div>
            </div>

            {/* Segmented control */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Segmented Control</h3>
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
                {[["List", "Grid", "Map"], ["Video", "Photo", "Audio"], ["Day", "Week", "Month", "Year"]].map((options, gi) => (
                  <SegCtrl key={gi} options={options} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Pagination</h3>
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                {[
                  { total: "243", shown: 20, page: 1, pages: 13 },
                  { total: "47",  shown: 10, page: 3, pages: 5  },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between flex-wrap gap-2 border-t border-border first:border-0 pt-3 first:pt-0">
                    <span className="text-xs text-muted-foreground">Showing {p.shown} of {p.total}</span>
                    <div className="flex items-center gap-0.5">
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground transition-colors"><ChevronLeft className="w-3.5 h-3.5" /></button>
                      {Array.from({ length: Math.min(p.pages, 5) }, (_, k) => k + 1).map(n => (
                        <button key={n} className={cn(
                          "w-7 h-7 text-xs rounded font-medium transition-colors",
                          n === p.page ? "bg-primary text-white" : "hover:bg-secondary text-muted-foreground"
                        )}>{n}</button>
                      ))}
                      {p.pages > 5 && <span className="px-1 text-xs text-muted-foreground">…</span>}
                      <button className="p-1.5 rounded hover:bg-secondary text-muted-foreground transition-colors"><ChevronRight className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ──────────────────────────────────────────────────────────── */}
      {tab === "modals" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Dialog Variants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
                <div>
                  <p className="text-sm font-medium">Confirmation Dialog</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Destructive action with icon, explanation, cancel + confirm.</p>
                </div>
                <Btn variant="destructive" icon={Trash2} size="sm" onClick={() => setConfirmOpen(true)}>Open confirm dialog</Btn>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
                <div>
                  <p className="text-sm font-medium">Form Dialog</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Edit form in a medium-sized modal with close button.</p>
                </div>
                <Btn variant="outline" icon={Edit} size="sm" onClick={() => setFormOpen(true)}>Open form dialog</Btn>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-3">
                <div>
                  <p className="text-sm font-medium">Preview Dialog</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Large content preview with image and metadata.</p>
                </div>
                <Btn variant="secondary" icon={Eye} size="sm" onClick={() => setPreviewOpen(true)}>Open preview dialog</Btn>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Static Previews</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* sm: confirm */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Small — Confirm (max-w-sm)</p>
                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="p-5">
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center mb-3">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-sm font-semibold mb-1">Delete reportage?</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">RPT-2240 will be permanently removed. This cannot be undone.</p>
                  </div>
                  <div className="px-5 pb-4 flex gap-2 justify-end">
                    <Btn variant="outline" size="xs">Cancel</Btn>
                    <Btn variant="destructive" size="xs">Delete</Btn>
                  </div>
                </div>
              </div>

              {/* md: form */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Medium — Form (max-w-md)</p>
                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <p className="text-sm font-semibold">Edit reporter</p>
                    <div className="p-0.5 rounded hover:bg-secondary cursor-pointer"><XIcon className="w-3.5 h-3.5 text-muted-foreground" /></div>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    {["Display name", "Email", "Country"].map(f => (
                      <div key={f}>
                        <label className="block text-[10px] font-medium mb-0.5">{f}</label>
                        <div className="h-7 rounded border border-border bg-background px-2 flex items-center text-xs text-muted-foreground">—</div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 pb-3 flex gap-1.5 justify-end">
                    <Btn variant="outline" size="xs">Cancel</Btn>
                    <Btn variant="primary" size="xs">Save</Btn>
                  </div>
                </div>
              </div>

              {/* lg: info */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Info / alert (with icon header)</p>
                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                      <Info className="w-3.5 h-3.5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">AV Scan in progress</p>
                      <p className="text-[10px] text-muted-foreground">REP-0077 · started 2 min ago</p>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">Your file is being scanned. Delivery will be available once the scan completes, typically within 5 minutes.</p>
                    <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-primary rounded-full" />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">67% complete</p>
                  </div>
                  <div className="px-4 pb-3 flex justify-end">
                    <Btn variant="outline" size="xs">Dismiss</Btn>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Backdrop & Overlay</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "bg-black/40", cls: "bg-black/40" },
                { label: "bg-black/50 + blur", cls: "bg-black/50 backdrop-blur-sm" },
                { label: "bg-black/70", cls: "bg-black/70" },
              ].map(({ label, cls }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground mb-2 font-mono">{label}</p>
                  <div className="relative h-20 rounded-lg overflow-hidden border border-border">
                    <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=80&fit=crop&auto=format" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className={cn("absolute inset-0 flex items-center justify-center", cls)}>
                      <div className="bg-card rounded-md px-3 py-1.5 text-xs font-medium shadow-sm">Dialog</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ── DROPDOWNS ───────────────────────────────────────────────────────── */}
      {tab === "dropdowns" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Action Menu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Three-dot context */}
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-3">Row action menu (⋯)</p>
                <div className="relative inline-block">
                  <button
                    onClick={() => { setActionOpen(v => !v); setContextOpen(false); setDdOpen(false); }}
                    className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground transition-colors border border-border"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  {actionOpen && (
                    <div className="absolute left-0 top-9 z-30 bg-card border border-border rounded-lg shadow-xl py-1 w-48" onClick={() => setActionOpen(false)}>
                      {[
                        { icon: Eye,      label: "View details",    cls: "" },
                        { icon: Edit,     label: "Edit reportage",  cls: "" },
                        { icon: Download, label: "Download files",  cls: "" },
                        { icon: Copy,     label: "Duplicate",       cls: "" },
                        { icon: Trash2,   label: "Delete",          cls: "text-red-600 hover:bg-red-50" },
                      ].map(({ icon: Icon, label, cls }) => (
                        <button key={label} className={cn("w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-secondary transition-colors text-left", cls)}>
                          <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Context menu */}
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-3">Context menu (right-click style)</p>
                <div className="relative">
                  <button
                    onClick={() => { setContextOpen(v => !v); setActionOpen(false); setDdOpen(false); }}
                    className="text-xs text-primary underline-offset-2 hover:underline"
                  >
                    {contextOpen ? "Close menu" : "Show context menu"}
                  </button>
                  {contextOpen && (
                    <div className="absolute left-0 top-7 z-30 bg-card border border-border rounded-lg shadow-xl py-1 w-52" onClick={() => setContextOpen(false)}>
                      <div className="px-3 py-1 border-b border-border mb-1">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">RPT-2240</p>
                      </div>
                      {[
                        { icon: Eye,         label: "Open",        shortcut: "↵"    },
                        { icon: ExternalLink, label: "Open in tab", shortcut: "⌘↵"   },
                        { icon: Copy,        label: "Copy link",   shortcut: "⌘C"   },
                        { icon: Bookmark,    label: "Bookmark",    shortcut: "⌘B"   },
                      ].map(({ icon: Icon, label, shortcut }) => (
                        <button key={label} className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-secondary transition-colors text-left justify-between">
                          <span className="flex items-center gap-2.5"><Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />{label}</span>
                          <kbd className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{shortcut}</kbd>
                        </button>
                      ))}
                      <div className="border-t border-border mt-1 pt-1">
                        <button className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                          <Trash2 className="w-3.5 h-3.5 flex-shrink-0" />Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Select dropdown */}
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-3">Select / combobox dropdown</p>
                <div className="relative">
                  <button
                    onClick={() => { setDdOpen(v => !v); setActionOpen(false); setContextOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-1.5 text-sm bg-background border border-border rounded-md hover:border-primary/50 transition-colors"
                  >
                    <span>{ddValue}</span>
                    <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", ddOpen && "rotate-90")} />
                  </button>
                  {ddOpen && (
                    <div className="absolute left-0 right-0 top-10 z-30 bg-card border border-border rounded-lg shadow-xl py-1 max-h-48 overflow-y-auto">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setDdValue(cat); setDdOpen(false); }}
                          className={cn(
                            "w-full text-left px-3 py-1.5 text-sm hover:bg-secondary transition-colors flex items-center gap-2",
                            ddValue === cat && "text-primary font-medium"
                          )}
                        >
                          {ddValue === cat && <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                          {ddValue !== cat && <span className="w-3.5" />}
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Static Previews</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Grouped menu */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Grouped action menu</p>
                <div className="bg-card border border-border rounded-lg shadow-xl py-1 w-full">
                  <div className="px-3 py-1 mb-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Account</p>
                  </div>
                  {[{ icon: Users, label: "Profile" }, { icon: Settings, label: "Settings" }, { icon: Bell, label: "Notifications" }].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-secondary transition-colors text-left">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />{label}
                    </button>
                  ))}
                  <div className="border-t border-border my-1" />
                  <div className="px-3 py-1 mb-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Support</p>
                  </div>
                  {[{ icon: Info, label: "Help center" }, { icon: Mail, label: "Contact us" }].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm hover:bg-secondary transition-colors text-left">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />{label}
                    </button>
                  ))}
                  <div className="border-t border-border mt-1 pt-1">
                    <button className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                      <LogOut className="w-3.5 h-3.5" />Sign out
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter panel */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Filter panel</p>
                <div className="bg-card border border-border rounded-lg shadow-xl p-3 w-full space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Status</p>
                    <div className="space-y-1">
                      {["All", "Active", "Pending", "Suspended"].map((s, i) => (
                        <label key={s} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="radio" name="status-filter" defaultChecked={i === 0} className="accent-primary" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">Format</p>
                    <div className="space-y-1">
                      {["Video", "Photo", "Audio"].map(f => (
                        <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input type="checkbox" defaultChecked className="accent-primary" />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 pt-1 border-t border-border">
                    <Btn variant="outline" size="xs" className="flex-1">Reset</Btn>
                    <Btn variant="primary" size="xs" className="flex-1">Apply</Btn>
                  </div>
                </div>
              </div>

              {/* Notification dropdown */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Notification tray</p>
                <div className="bg-card border border-border rounded-lg shadow-xl w-full overflow-hidden">
                  <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
                    <p className="text-sm font-semibold">Notifications</p>
                    <button className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  {[
                    { icon: CheckCircle, msg: "RPT-2240 approved", time: "2m ago", read: false, color: "text-emerald-500" },
                    { icon: DollarSign,  msg: "Withdrawal $320 sent", time: "1h ago", read: false, color: "text-primary" },
                    { icon: AlertCircle, msg: "Dispute DSP-019 opened", time: "3h ago", read: true, color: "text-amber-500" },
                  ].map(({ icon: Icon, msg, time, read, color }) => (
                    <div key={msg} className={cn("flex items-start gap-2.5 px-3 py-2.5 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors", !read && "bg-primary/5")}>
                      <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", color)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">{msg}</p>
                        <p className="text-[10px] text-muted-foreground">{time}</p>
                      </div>
                      {!read && <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {tab === "colors" && (
        <div className="space-y-6">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Brand & Semantic</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Primary", bg: "bg-[#1B4FDD]", hex: "#1B4FDD" },
                { label: "Success", bg: "bg-emerald-500", hex: "#10B981" },
                { label: "Warning", bg: "bg-amber-500", hex: "#F59E0B" },
                { label: "Danger",  bg: "bg-red-500",     hex: "#EF4444" },
                { label: "Info",    bg: "bg-sky-500",     hex: "#0EA5E9" },
                { label: "Neutral", bg: "bg-slate-400",   hex: "#94A3B8" },
              ].map(c => (
                <div key={c.label}>
                  <div className={cn("w-20 h-12 rounded-md flex items-end p-1.5", c.bg)}>
                    <span className="text-[10px] font-medium text-white">{c.label}</span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Surface & Ground</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Background", cls: "bg-[#EFF1F9] border border-border" },
                { label: "Card",       cls: "bg-white border border-border" },
                { label: "Secondary",  cls: "bg-[#E6EAF5]" },
                { label: "Muted",      cls: "bg-[#DCE2EE]" },
                { label: "Border",     cls: "bg-[#DDE3EF] border border-border" },
              ].map(c => (
                <div key={c.label}>
                  <div className={cn("w-20 h-12 rounded-md", c.cls)} />
                  <span className="text-[11px] text-muted-foreground">{c.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              {["completed","pending","processing","failed","refunded","active","suspended","banned","draft","submitted","reviewing","approved","delivered","rejected","ready","scanning","downloaded","expired"].map(s => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "type" && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-5">
          {[
            { label: "H1 / 24px / 500", el: <h1 className="text-2xl font-semibold">Breaking: Flash Floods in Aktobe Region</h1> },
            { label: "H2 / 20px / 500", el: <h2 className="text-xl font-semibold">Reporter Dashboard Overview</h2> },
            { label: "H3 / 18px / 500", el: <h3 className="text-lg font-semibold">Financial Transaction History</h3> },
            { label: "H4 / 14px / 500", el: <h4 className="text-sm font-semibold">Subscription Plans</h4> },
            { label: "Body / 14px", el: <p className="text-sm leading-relaxed">Reportage content covering the major flood event across three districts. Filed by on-ground reporter Daniyar Seitkali with full video documentation, GPS metadata, and verified source interviews.</p> },
            { label: "Caption / 12px", el: <p className="text-xs text-muted-foreground">Last updated 2026-05-24 · Verified by Admin · 3 attachments · SHA-256 clean</p> },
            { label: "Mono / JetBrains", el: <p className="font-mono text-sm">TXN-4491 · sha256:a3f9d2e1...8b2c · 1.2 GB · $5,000.00</p> },
          ].map(({ label, el }) => (
            <div key={label}>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest block mb-1">{label}</span>
              {el}
            </div>
          ))}
        </div>
      )}

      {tab === "buttons" && (
        <div className="bg-card border border-border rounded-lg p-5 space-y-6">
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Variants</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Btn variant="primary">Primary</Btn>
              <Btn variant="secondary">Secondary</Btn>
              <Btn variant="outline">Outline</Btn>
              <Btn variant="ghost">Ghost</Btn>
              <Btn variant="destructive">Destructive</Btn>
              <Btn variant="primary" disabled>Disabled</Btn>
            </div>
          </section>
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">With Icons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Btn variant="primary" icon={Plus}>New Reportage</Btn>
              <Btn variant="outline" icon={Download}>Download</Btn>
              <Btn variant="destructive" icon={Trash2}>Delete</Btn>
              <Btn variant="ghost" icon={Edit}>Edit</Btn>
              <Btn variant="secondary" icon={Filter}>Filter</Btn>
              <Btn variant="outline" icon={RefreshCw}>Refresh</Btn>
            </div>
          </section>
          <section>
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Sizes</h3>
            <div className="flex flex-wrap items-end gap-3">
              <Btn variant="primary" size="xs">Extra Small</Btn>
              <Btn variant="primary" size="sm">Small</Btn>
              <Btn variant="primary" size="md">Medium</Btn>
            </div>
          </section>
        </div>
      )}

      {tab === "forms" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Inputs & Selects</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" defaultValue="Flash Floods in Aktobe" className="w-full px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select className="w-full px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Environment</option><option>Politics</option><option>Culture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea rows={3} className="w-full px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" defaultValue="On-ground video documentation of the flood event…" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Search</label>
              <SearchInput placeholder="Search users, reportages…" value="" onChange={() => {}} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Error State</label>
              <input type="text" defaultValue="invalid-id" className="w-full px-3 py-1.5 text-sm border border-red-400 rounded-md bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300" />
              <p className="text-xs text-red-600 mt-1">Invalid format. Expected: USR-XXXX</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Controls</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Format</label>
              {["Video", "Photo", "Audio"].map(f => (
                <label key={f} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="format" defaultChecked={f === "Video"} className="accent-[#1B4FDD]" />
                  {f}
                </label>
              ))}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Options</label>
              {["GPS metadata included", "Verified sources", "Exclusive content"].map(o => (
                <label key={o} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-[#1B4FDD]" />
                  {o}
                </label>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Publish immediately</span>
              <button className="w-9 h-5 bg-primary rounded-full relative">
                <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">File Upload</label>
              <div className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Drag files here or <span className="text-primary font-medium">browse</span></p>
                <p className="text-xs text-muted-foreground mt-0.5">MP4, MOV, JPG, RAW, MP3 · Max 5 GB</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "tables" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-3 border-b border-border flex items-center gap-2 flex-wrap">
            <SearchInput placeholder="Search reportages…" value="" onChange={() => {}} />
            <Btn variant="outline" icon={Filter} size="xs">Filter</Btn>
            <select className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none text-sm">
              <option>All Formats</option><option>Video</option><option>Photo</option>
            </select>
            <div className="ml-auto">
              <Btn variant="primary" icon={Plus} size="xs">New Reportage</Btn>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
              <thead className="bg-secondary/60">
                <tr>
                  <TH>ID</TH><TH>Title</TH><TH>Reporter</TH><TH>Category</TH>
                  <TH>Format</TH><TH>Price</TH><TH>Status</TH><TH>Date</TH><TH></TH>
                </tr>
              </thead>
              <tbody>
                {REPORTAGES.slice(0, 5).map(r => (
                  <tr key={r.id} className="hover:bg-secondary/30 transition-colors">
                    <TD mono>{r.id}</TD>
                    <TD><span className="max-w-[180px] block truncate font-medium">{r.title}</span></TD>
                    <TD>{r.reporter}</TD>
                    <TD><Chip color="gray">{r.category}</Chip></TD>
                    <TD><Chip color={r.format === "Video" ? "blue" : "amber"}>{r.format}</Chip></TD>
                    <TD mono>${r.price}</TD>
                    <TD><StatusBadge status={r.status} /></TD>
                    <TD mono>{r.date}</TD>
                    <TD>
                      <div className="flex gap-1">
                        <Btn variant="ghost" size="xs" icon={Eye} />
                        <Btn variant="ghost" size="xs" icon={MoreHorizontal} />
                      </div>
                    </TD>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
          <Pagination total="243" shown={5} />
        </div>
      )}

      {tab === "states" && (
        <div className="space-y-5">

          {/* ── State kind switcher ─────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2">
            {([
              { k: "empty",     icon: Inbox,        label: "Empty",     desc: "No content exists yet",       active: "bg-slate-700 text-white border-slate-700",   base: "border-border text-muted-foreground hover:border-slate-400 hover:text-foreground" },
              { k: "loading",   icon: RefreshCw,    label: "Loading",   desc: "Data is being fetched",        active: "bg-primary text-white border-primary",        base: "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground" },
              { k: "error",     icon: AlertCircle,  label: "Error",     desc: "Request failed",               active: "bg-red-500 text-white border-red-500",         base: "border-border text-muted-foreground hover:border-red-300 hover:text-foreground" },
              { k: "forbidden", icon: Shield,       label: "Forbidden", desc: "Access not permitted",         active: "bg-amber-500 text-white border-amber-500",     base: "border-border text-muted-foreground hover:border-amber-300 hover:text-foreground" },
            ] as const).map(({ k, icon: Icon, label, desc, active, base }) => (
              <button
                key={k}
                onClick={() => setStateKind(k)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                  stateKind === k ? active : base
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
                <span className={cn("hidden sm:inline text-xs font-normal opacity-70")}>{desc}</span>
              </button>
            ))}
          </div>

          {/* ── EMPTY ──────────────────────────────────────────────────────── */}
          {stateKind === "empty" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Empty states appear when a screen has no data — either first-use, post-filter, or after all items are removed. Each has a clear headline, supporting copy, and a recovery CTA.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Reportage list — first use */}
                <ScreenFrame title="My Reportages" label="List · first use">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">No reportages yet</h3>
                    <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">Start earning by creating your first reportage or responding to open buyer requests.</p>
                    <div className="flex gap-2">
                      <Btn variant="primary" icon={Plus} size="xs">Create</Btn>
                      <Btn variant="outline" size="xs">Browse requests</Btn>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Search — no results */}
                <ScreenFrame title="Search results" label="List · zero results">
                  <div className="px-3 pb-2">
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary border border-border rounded-md mb-3">
                      <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-foreground">"aktobe flood 2025"</span>
                      <XIcon className="w-3 h-3 text-muted-foreground ml-auto cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center py-6 px-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3">
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">No results</h3>
                    <p className="text-xs text-muted-foreground mb-3">Try different keywords or remove active filters.</p>
                    <Btn variant="outline" size="xs" icon={XIcon}>Clear search</Btn>
                  </div>
                </ScreenFrame>

                {/* Notifications — all read */}
                <ScreenFrame title="Notifications" label="Feed · all cleared">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-4">
                    <div className="relative w-12 h-12 mb-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Bell className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{"You're all caught up"}</h3>
                    <p className="text-xs text-muted-foreground">No unread notifications. {"We'll"} let you know when something needs your attention.</p>
                  </div>
                </ScreenFrame>

                {/* Earnings — no activity */}
                <ScreenFrame title="Earnings" label="Dashboard · new reporter">
                  <div className="px-3 py-2 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Total earned", "This month", "Pending"].map(l => (
                        <div key={l} className="bg-secondary rounded p-2">
                          <p className="text-[9px] text-muted-foreground">{l}</p>
                          <p className="text-sm font-semibold font-mono">$0.00</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-center text-center py-5">
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mb-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-xs font-medium mb-0.5">No earnings yet</p>
                      <p className="text-[10px] text-muted-foreground">Earnings appear once a reportage is sold and delivered.</p>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Bookmarks — empty */}
                <ScreenFrame title="Bookmarks" label="Collection · empty">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-4">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <Bookmark className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-semibold mb-1">No saved items</h3>
                    <p className="text-xs text-muted-foreground mb-4">Bookmark reportages, reporters, or requests to find them quickly later.</p>
                    <Btn variant="outline" size="xs" icon={Globe}>Browse marketplace</Btn>
                  </div>
                </ScreenFrame>

                {/* Admin users — filtered out */}
                <ScreenFrame title="Users" label="Admin list · filtered">
                  <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1 bg-primary/10 text-primary text-[10px] rounded px-1.5 py-0.5 font-medium">
                      Role: Admin <XIcon className="w-2.5 h-2.5 cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 text-primary text-[10px] rounded px-1.5 py-0.5 font-medium">
                      Status: Banned <XIcon className="w-2.5 h-2.5 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center py-6 px-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                      <Filter className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-medium mb-1">No users match filters</p>
                    <p className="text-[10px] text-muted-foreground mb-3">0 of 4,821 users match the current filter combination.</p>
                    <Btn variant="ghost" size="xs" icon={XIcon}>Reset filters</Btn>
                  </div>
                </ScreenFrame>

              </div>
            </div>
          )}

          {/* ── LOADING ────────────────────────────────────────────────────── */}
          {stateKind === "loading" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Skeleton loading states mirror the layout of real content — same structure, animated pulse. Prefer skeletons over spinners for content-heavy screens to reduce perceived latency.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Table list skeleton */}
                <ScreenFrame title="Reportages" label="Table list">
                  <div className="px-3 pb-1">
                    <div className="flex gap-2 mb-2">
                      <div className="h-6 bg-muted rounded flex-1 animate-pulse" />
                      <div className="h-6 w-16 bg-muted rounded animate-pulse" />
                    </div>
                    <div className="space-y-0">
                      <div className="grid grid-cols-5 gap-2 py-1.5 border-b border-border">
                        {["w-8","w-16","w-12","w-10","w-10"].map((w,i) => (
                          <div key={i} className={cn("h-2.5 bg-muted/60 rounded animate-pulse", w)} />
                        ))}
                      </div>
                      {[75,60,85,55,70].map((pct, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2 py-2 border-b border-border last:border-0">
                          <div className="h-3 bg-muted rounded animate-pulse w-8" style={{ animationDelay: `${i * 80}ms` }} />
                          <div className="h-3 bg-muted rounded animate-pulse" style={{ width: `${pct}%`, animationDelay: `${i * 80 + 40}ms` }} />
                          <div className="h-3 bg-muted rounded animate-pulse w-10" style={{ animationDelay: `${i * 80 + 80}ms` }} />
                          <div className="h-4 w-10 bg-muted rounded-full animate-pulse" style={{ animationDelay: `${i * 80 + 120}ms` }} />
                          <div className="h-4 w-8 bg-muted rounded-full animate-pulse" style={{ animationDelay: `${i * 80 + 160}ms` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScreenFrame>

                {/* Card grid skeleton */}
                <ScreenFrame title="Marketplace" label="Card grid">
                  <div className="px-3 pb-2 grid grid-cols-2 gap-2">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="bg-secondary rounded-lg overflow-hidden" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="h-16 bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                        <div className="p-2 space-y-1.5">
                          <div className="h-2.5 bg-muted rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }} />
                          <div className="h-2.5 bg-muted rounded animate-pulse w-3/4" style={{ animationDelay: `${i * 100 + 100}ms` }} />
                          <div className="flex items-center justify-between pt-0.5">
                            <div className="h-3 w-8 bg-muted rounded animate-pulse" />
                            <div className="h-4 w-10 bg-muted/60 rounded animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScreenFrame>

                {/* Detail view skeleton */}
                <ScreenFrame title="Reportage Detail" label="Detail view">
                  <div className="px-3 pb-2 space-y-2">
                    <div className="h-20 bg-muted rounded-lg animate-pulse" />
                    <div className="flex gap-2">
                      <div className="h-4 w-12 bg-muted rounded-full animate-pulse" />
                      <div className="h-4 w-14 bg-muted rounded-full animate-pulse" style={{ animationDelay: "80ms" }} />
                    </div>
                    <div className="space-y-1.5">
                      {[90, 80, 70, 85, 60].map((w, i) => (
                        <div key={i} className="h-2.5 bg-muted rounded animate-pulse" style={{ width: `${w}%`, animationDelay: `${i * 60}ms` }} />
                      ))}
                    </div>
                    <div className="border border-border rounded-lg p-2 space-y-1.5">
                      <div className="h-2 bg-muted/50 rounded animate-pulse w-20" />
                      {[1,2,3].map(i => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-muted animate-pulse flex-shrink-0" />
                          <div className="h-2 bg-muted rounded animate-pulse flex-1" style={{ animationDelay: `${i * 60}ms` }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </ScreenFrame>

                {/* Dashboard skeleton */}
                <ScreenFrame title="Admin Dashboard" label="Dashboard">
                  <div className="px-3 pb-2 space-y-2">
                    <div className="grid grid-cols-4 gap-1.5">
                      {[0,1,2,3].map(i => (
                        <div key={i} className="bg-secondary rounded p-2 space-y-1" style={{ animationDelay: `${i * 60}ms` }}>
                          <div className="h-2 bg-muted rounded animate-pulse w-3/4" />
                          <div className="h-4 bg-muted rounded animate-pulse" />
                          <div className="h-2 bg-muted/50 rounded animate-pulse w-1/2" />
                        </div>
                      ))}
                    </div>
                    <div className="bg-secondary rounded-lg p-2">
                      <div className="h-2 bg-muted rounded animate-pulse w-24 mb-2" />
                      <div className="flex items-end gap-0.5 h-16">
                        {[40,65,50,80,60,90,70,85,55,75,95,60].map((h, i) => (
                          <div key={i} className="flex-1 bg-muted rounded-t animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 40}ms` }} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {[85,70,60,75].map((w, i) => (
                        <div key={i} className="h-6 bg-muted rounded animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                  </div>
                </ScreenFrame>

              </div>
            </div>
          )}

          {/* ── ERROR ──────────────────────────────────────────────────────── */}
          {stateKind === "error" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Error states replace the main content area. They communicate the failure type precisely, never blame the user, and offer a concrete recovery path with the right affordance for the error severity.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Network offline */}
                <ScreenFrame title="Reportages" label="Network offline">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <Globe className="w-5 h-5 text-slate-400" />
                    </div>
                    <p className="text-xs font-semibold mb-1">No connection</p>
                    <p className="text-[10px] text-muted-foreground mb-3">Check your network and try again.</p>
                    <Btn variant="outline" icon={RefreshCw} size="xs">Retry</Btn>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span className="text-[10px] text-slate-600 font-mono">ERR_NETWORK · last synced 4m ago</span>
                    </div>
                  </div>
                </ScreenFrame>

                {/* 404 Not found */}
                <ScreenFrame title="Reportage Detail" label="404 not found">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="text-3xl font-bold text-muted-foreground/30 mb-2 font-mono">404</div>
                    <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mb-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Reportage not found</p>
                    <p className="text-[10px] text-muted-foreground mb-3">RPT-9912 may have been removed or never existed.</p>
                    <Btn variant="ghost" icon={ChevronLeft} size="xs">Back to list</Btn>
                  </div>
                </ScreenFrame>

                {/* 500 Server error */}
                <ScreenFrame title="Admin Dashboard" label="500 server error">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Something went wrong</p>
                    <p className="text-[10px] text-muted-foreground mb-3">An unexpected error occurred. The team has been notified.</p>
                    <div className="flex gap-1.5">
                      <Btn variant="outline" icon={RefreshCw} size="xs">Reload</Btn>
                      <Btn variant="ghost" size="xs">Support</Btn>
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-red-50 border border-red-200 rounded px-2 py-1.5">
                      <span className="text-[9px] text-red-600 font-mono">500 Internal Server Error · req_7x2k9a</span>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Timeout */}
                <ScreenFrame title="Marketplace" label="Request timeout">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Request timed out</p>
                    <p className="text-[10px] text-muted-foreground mb-3">The server took too long to respond. This is usually temporary.</p>
                    <Btn variant="outline" icon={RefreshCw} size="xs">Try again</Btn>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1.5">
                      <span className="text-[9px] text-amber-700 font-mono">ETIMEDOUT after 30 000ms</span>
                    </div>
                  </div>
                </ScreenFrame>

              </div>

              {/* Inline error variants (banner) */}
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Inline Alert Variants</h3>
                <div className="space-y-2">
                  {[
                    { icon: Info,          msg: "AV scan in progress. Delivery will be available shortly.",                                  cls: "bg-sky-50 border-sky-200 text-sky-800" },
                    { icon: CheckCircle,   msg: "Reportage RPT-2240 approved and is now live on the marketplace.",                           cls: "bg-emerald-50 border-emerald-200 text-emerald-800" },
                    { icon: AlertTriangle, msg: "Wallet balance is below the minimum withdrawal threshold ($50.00).",                        cls: "bg-amber-50 border-amber-200 text-amber-800" },
                    { icon: XCircle,       msg: "Payment failed. Transaction TXN-4487 could not be processed. Verify your bank details.",    cls: "bg-red-50 border-red-200 text-red-800" },
                  ].map(({ icon: Icon, msg, cls }, i) => (
                    <div key={i} className={cn("flex items-start gap-2.5 p-3 rounded-md border text-sm", cls)}>
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── FORBIDDEN ──────────────────────────────────────────────────── */}
          {stateKind === "forbidden" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">Forbidden states communicate why access is blocked and offer the appropriate recovery path — sign in, upgrade, contact support, or wait. Never show a blank screen or an unrecognizable error code.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Not authenticated */}
                <ScreenFrame title="My Reportages" label="Not signed in">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Sign in to continue</p>
                    <p className="text-[10px] text-muted-foreground mb-3">This page is only available to registered users. Create a free account or sign in.</p>
                    <div className="flex flex-col gap-1.5 w-full px-2">
                      <Btn variant="primary" size="xs" full>Sign in</Btn>
                      <Btn variant="outline" size="xs" full>Create account</Btn>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Insufficient role */}
                <ScreenFrame title="Admin Panel" label="Wrong role">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                      <Shield className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Access denied</p>
                    <p className="text-[10px] text-muted-foreground mb-3">Admin privileges are required to view this page. Contact your platform administrator.</p>
                    <div className="flex gap-1.5">
                      <Btn variant="ghost" icon={ChevronLeft} size="xs">Go back</Btn>
                      <Btn variant="outline" icon={Mail} size="xs">Contact admin</Btn>
                    </div>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-amber-50 border border-amber-200 rounded px-2 py-1.5 flex items-center gap-1.5">
                      <UserCheck className="w-3 h-3 text-amber-600 flex-shrink-0" />
                      <span className="text-[9px] text-amber-700">Signed in as <strong>Reporter</strong> · requires Admin</span>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Subscription required */}
                <ScreenFrame title="Reportage Detail" label="Paywall">
                  <div className="px-3 pt-1 pb-2">
                    <div className="relative">
                      <div className="h-16 bg-muted rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=64&fit=crop&auto=format" alt="" className="w-full h-full object-cover opacity-30" />
                      </div>
                      <div className="space-y-1.5 mt-2 blur-sm select-none">
                        {[85, 70, 60].map((w, i) => <div key={i} className="h-2.5 bg-muted rounded" style={{ width: `${w}%` }} />)}
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mb-1.5">
                          <Lock className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-[10px] font-semibold mb-0.5">Subscription required</p>
                        <p className="text-[9px] text-muted-foreground mb-2">Pro plan · from $49/mo</p>
                        <Btn variant="primary" size="xs">Upgrade plan</Btn>
                      </div>
                    </div>
                  </div>
                </ScreenFrame>

                {/* Account suspended */}
                <ScreenFrame title="Dashboard" label="Account suspended">
                  <div className="flex flex-col items-center justify-center text-center py-8 px-3">
                    <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-xs font-semibold mb-1">Account suspended</p>
                    <p className="text-[10px] text-muted-foreground mb-3">Your account has been suspended pending review. You cannot access platform features during this period.</p>
                    <Btn variant="outline" icon={Mail} size="xs">Appeal decision</Btn>
                  </div>
                  <div className="px-3 pb-3">
                    <div className="bg-red-50 border border-red-200 rounded px-2 py-1.5">
                      <span className="text-[9px] text-red-700">Suspended on 2026-05-18 · Case #SUS-0091</span>
                    </div>
                  </div>
                </ScreenFrame>

              </div>
            </div>
          )}

        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Dashboard ────────────────────────────────────────────────────
function AdminDashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <Page title="Dashboard" breadcrumbs={["Admin", "Dashboard"]}
      actions={<><Btn variant="outline" icon={RefreshCw} size="xs">Refresh</Btn><Btn variant="outline" icon={Download} size="xs">Export</Btn></>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Platform Revenue" value="$31,200" trend="+8.7%" trendUp icon={TrendingUp} sub="this month" />
        <StatCard label="Active Users" value="4,821" trend="+12.3%" trendUp icon={Users} sub="vs last month" />
        <StatCard label="New Reportages" value="243" trend="+18 new" trendUp icon={FileText} sub="this month" />
        <StatCard label="Open Disputes" value="7" trend="-3" trendUp={false} icon={AlertTriangle} sub="need review" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Platform Revenue</h3>
              <p className="text-xs text-muted-foreground">Revenue vs. withdrawals — last 12 months</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-primary rounded-full inline-block" />Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-slate-300 rounded-full inline-block" />Withdrawals</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart id="ch-revenue" data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EF" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ fontSize: 12, border: "1px solid #DDE3EF", borderRadius: 6 }} />
              <Area key="revenue" name="Revenue" type="monotone" dataKey="revenue" stroke="#1B4FDD" strokeWidth={2} fill="#1B4FDD" fillOpacity={0.08} />
              <Area key="withdrawals" name="Withdrawals" type="monotone" dataKey="withdrawals" stroke="#CBD5E1" strokeWidth={2} fill="#CBD5E1" fillOpacity={0.12} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold">Daily Activity</h3>
            <p className="text-xs text-muted-foreground">Signups & purchases this week</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart id="ch-activity" data={USER_ACTIVITY} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EF" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #DDE3EF", borderRadius: 6 }} />
              <Bar key="signups" dataKey="signups" fill="#1B4FDD" radius={[3, 3, 0, 0]} opacity={0.85} name="Signups" />
              <Bar key="purchases" dataKey="purchases" fill="#10B981" radius={[3, 3, 0, 0]} opacity={0.85} name="Purchases" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Transactions</h3>
            <Btn variant="ghost" size="xs" onClick={() => onNavigate("admin-transactions")}>
              View all <ArrowRight className="w-3 h-3" />
            </Btn>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50">
              <TH>ID</TH><TH>User</TH><TH>Type</TH><TH>Amount</TH><TH>Status</TH>
            </tr></thead>
            <tbody>
              {TRANSACTIONS.slice(0, 5).map(tx => (
                <tr key={tx.id} className="hover:bg-secondary/30">
                  <TD mono>{tx.id}</TD>
                  <TD><span className="text-sm max-w-[100px] block truncate">{tx.user}</span></TD>
                  <TD><Chip color={tx.type === "deposit" ? "green" : tx.type === "withdrawal" ? "amber" : "blue"}>{tx.type}</Chip></TD>
                  <TD mono>${tx.amount.toLocaleString()}</TD>
                  <TD><StatusBadge status={tx.status} /></TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Users</h3>
            <Btn variant="ghost" size="xs" onClick={() => onNavigate("admin-users")}>
              View all <ArrowRight className="w-3 h-3" />
            </Btn>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50">
              <TH>User</TH><TH>Role</TH><TH>Country</TH><TH>Status</TH><TH>Joined</TH>
            </tr></thead>
            <tbody>
              {USERS.slice(0, 5).map(u => (
                <tr key={u.id} className="hover:bg-secondary/30">
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar name={u.name} />
                      <span className="font-medium max-w-[100px] truncate block">{u.name}</span>
                    </div>
                  </TD>
                  <TD><Chip color={u.role === "reporter" ? "blue" : "gray"}>{u.role}</Chip></TD>
                  <TD><span className="text-xs text-muted-foreground">{u.country}</span></TD>
                  <TD><StatusBadge status={u.status} /></TD>
                  <TD mono>{u.joined}</TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Users ────────────────────────────────────────────────────────
function AdminUsersScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState<"name" | "joined" | "balance">("joined");

  const filtered = useMemo(() =>
    USERS
      .filter(u => {
        if (roleFilter !== "all" && u.role !== roleFilter) return false;
        if (statusFilter !== "all" && u.status !== statusFilter) return false;
        if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "balance") return b.balance - a.balance;
        return b.joined.localeCompare(a.joined);
      }),
    [search, roleFilter, statusFilter, sort]
  );

  return (
    <Page title="Users" breadcrumbs={["Admin", "Users"]}
      actions={<><Btn variant="outline" icon={Download} size="xs">Export CSV</Btn><Btn variant="primary" icon={Plus} size="xs" onClick={() => onNavigate("admin-user-new")}>New User</Btn></>}
    >
      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-2.5 flex-wrap mb-4">
        <SearchInput placeholder="Search by name or email…" value={search} onChange={setSearch} />
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Roles</option>
          <option value="reporter">Reporter</option>
          <option value="customer">Customer</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
        <div className="ml-auto text-xs text-muted-foreground">{filtered.length} users</div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr>
                <TH><input type="checkbox" className="accent-[#1B4FDD]" /></TH>
                <TH sortable active={sort === "name"} onClick={() => setSort("name")}>User</TH>
                <TH>Email</TH>
                <TH>Role</TH>
                <TH>Country</TH>
                <TH sortable active={sort === "balance"} onClick={() => setSort("balance")}>Balance</TH>
                <TH>Reportages</TH>
                <TH>Status</TH>
                <TH sortable active={sort === "joined"} onClick={() => setSort("joined")}>Joined</TH>
                <TH>Actions</TH>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-secondary/30 transition-colors">
                  <TD><input type="checkbox" className="accent-[#1B4FDD]" /></TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar name={u.name} size="md" />
                      <div>
                        <div className="text-sm font-medium whitespace-nowrap">{u.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{u.id}</div>
                      </div>
                    </div>
                  </TD>
                  <TD><span className="text-xs">{u.email}</span></TD>
                  <TD><Chip color={u.role === "reporter" ? "blue" : "gray"}>{u.role}</Chip></TD>
                  <TD><span className="text-sm">{u.country}</span></TD>
                  <TD mono>${u.balance.toLocaleString("en", { minimumFractionDigits: 2 })}</TD>
                  <TD mono>{u.reportages}</TD>
                  <TD><StatusBadge status={u.status} /></TD>
                  <TD mono>{u.joined}</TD>
                  <TD>
                    <div className="flex gap-1">
                      <Btn variant="ghost" size="xs" icon={Eye}           onClick={() => onNavigate("admin-user-detail")} />
                      <Btn variant="ghost" size="xs" icon={Edit}          onClick={() => onNavigate("admin-user-edit")} />
                      <Btn variant="ghost" size="xs" icon={MoreHorizontal} />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <Pagination total="4,821" shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Transactions ─────────────────────────────────────────────────
function AdminTransactionsScreen() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = TRANSACTIONS.filter(tx => {
    if (typeFilter !== "all" && tx.type !== typeFilter) return false;
    if (statusFilter !== "all" && tx.status !== statusFilter) return false;
    if (search && !tx.user.toLowerCase().includes(search.toLowerCase()) && !tx.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    deposits:    TRANSACTIONS.filter(t => t.type === "deposit" && t.status === "completed").reduce((s, t) => s + t.amount, 0),
    withdrawals: TRANSACTIONS.filter(t => t.type === "withdrawal" && t.status === "completed").reduce((s, t) => s + t.amount, 0),
    pending:     TRANSACTIONS.filter(t => ["pending", "processing"].includes(t.status)).length,
    failed:      TRANSACTIONS.filter(t => t.status === "failed").length,
  };

  return (
    <Page title="Financial Transactions" breadcrumbs={["Admin", "Financial", "Transactions"]}
      actions={<Btn variant="outline" icon={Download} size="xs">Export</Btn>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <StatCard label="Total Deposits" value={`$${stats.deposits.toLocaleString()}`} icon={ArrowDownRight} sub="completed" />
        <StatCard label="Total Withdrawals" value={`$${stats.withdrawals.toLocaleString()}`} icon={ArrowUpRight} sub="completed" />
        <StatCard label="Pending / Processing" value={String(stats.pending)} icon={Clock} sub="transactions" />
        <StatCard label="Failed" value={String(stats.failed)} icon={XCircle} sub="this period" />
      </div>

      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-2.5 flex-wrap mb-4">
        <SearchInput placeholder="Search by user or ID…" value={search} onChange={setSearch} />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="purchase">Purchase</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="failed">Failed</option>
        </select>
        <Btn variant="outline" icon={Calendar} size="xs">Date Range</Btn>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} transactions</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr>
                <TH>Transaction ID</TH><TH>User</TH><TH>Type</TH><TH>Amount</TH>
                <TH>Method</TH><TH>Reference</TH><TH>Status</TH><TH>Date & Time</TH><TH>Actions</TH>
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id} className="hover:bg-secondary/30">
                  <TD mono>{tx.id}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar name={tx.user} />
                      <span className="text-sm whitespace-nowrap">{tx.user}</span>
                    </div>
                  </TD>
                  <TD><Chip color={tx.type === "deposit" ? "green" : tx.type === "withdrawal" ? "amber" : "blue"}>{tx.type}</Chip></TD>
                  <TD>
                    <span className={cn("font-mono text-sm font-semibold", tx.type === "deposit" ? "text-emerald-700" : tx.type === "withdrawal" ? "text-amber-700" : "text-foreground")}>
                      {tx.type === "deposit" ? "+" : tx.type === "withdrawal" ? "−" : ""}${tx.amount.toLocaleString("en", { minimumFractionDigits: 2 })}
                    </span>
                  </TD>
                  <TD>{tx.method}</TD>
                  <TD mono>{tx.ref}</TD>
                  <TD><StatusBadge status={tx.status} /></TD>
                  <TD mono>{tx.date}</TD>
                  <TD>
                    <div className="flex gap-1">
                      <Btn variant="ghost" size="xs" icon={Eye} />
                      <Btn variant="ghost" size="xs" icon={MoreHorizontal} />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <Pagination total="4,490" shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Reportages ───────────────────────────────────────────────────
function AdminReportagesScreen({ onNavigate }: { onNavigate?: (s: Screen) => void } = {}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");

  const filtered = REPORTAGES.filter(r => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (formatFilter !== "all" && r.format !== formatFilter) return false;
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.reporter.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <Page title="Reportages" breadcrumbs={["Admin", "Content", "Reportages"]}
      actions={<Btn variant="primary" icon={Plus} size="xs">New Reportage</Btn>}
    >
      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-2.5 flex-wrap mb-4">
        <SearchInput placeholder="Search reportages…" value={search} onChange={setSearch} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Statuses</option>
          <option value="delivered">Delivered</option>
          <option value="approved">Approved</option>
          <option value="reviewing">Reviewing</option>
          <option value="submitted">Submitted</option>
          <option value="rejected">Rejected</option>
          <option value="draft">Draft</option>
        </select>
        <select value={formatFilter} onChange={e => setFormatFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Formats</option>
          <option value="Video">Video</option>
          <option value="Photo">Photo</option>
          <option value="Audio">Audio</option>
        </select>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} results</span>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr>
                <TH>ID</TH><TH>Title</TH><TH>Reporter</TH><TH>Category</TH>
                <TH>Format</TH><TH>Duration</TH><TH>Price</TH><TH>Buyer</TH>
                <TH>Status</TH><TH>Date</TH><TH></TH>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-secondary/30">
                  <TD mono>{r.id}</TD>
                  <TD><span className="max-w-[200px] block truncate font-medium">{r.title}</span></TD>
                  <TD>{r.reporter}</TD>
                  <TD><Chip color="gray">{r.category}</Chip></TD>
                  <TD><Chip color={r.format === "Video" ? "blue" : r.format === "Photo" ? "amber" : "sky"}>{r.format}</Chip></TD>
                  <TD mono>{r.duration}</TD>
                  <TD mono>${r.price}</TD>
                  <TD><span className="text-sm">{r.buyer ?? <span className="text-muted-foreground">—</span>}</span></TD>
                  <TD><StatusBadge status={r.status} /></TD>
                  <TD mono>{r.date}</TD>
                  <TD>
                    <div className="flex gap-1">
                      <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate?.("admin-reportage-detail")} />
                      <Btn variant="ghost" size="xs" icon={MoreHorizontal} />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <Pagination total="243" shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Deliveries ───────────────────────────────────────────────────
function AdminDeliveriesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = DELIVERIES.filter(d => statusFilter === "all" || d.status === statusFilter);

  return (
    <Page title="Deliveries" breadcrumbs={["Admin", "Content", "Deliveries"]}>
      <div className="bg-card border border-border rounded-lg p-3 flex items-center gap-2.5 flex-wrap mb-4">
        <SearchInput placeholder="Search deliveries…" value="" onChange={() => {}} />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Statuses</option>
          <option value="ready">Ready</option>
          <option value="scanning">Scanning</option>
          <option value="downloaded">Downloaded</option>
          <option value="expired">Expired</option>
        </select>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr>
                <TH>ID</TH><TH>Reportage</TH><TH>Reporter</TH><TH>Customer</TH>
                <TH>Files</TH><TH>Size</TH><TH>AV Scan</TH><TH>Checksum</TH>
                <TH>Status</TH><TH>Expires</TH><TH></TH>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-secondary/30 cursor-pointer" onClick={() => onNavigate("delivery-detail")}>
                  <TD mono>{d.id}</TD>
                  <TD><span className="max-w-[160px] block truncate font-medium">{d.reportage}</span></TD>
                  <TD>{d.reporter}</TD>
                  <TD>{d.customer}</TD>
                  <TD mono>{d.files}</TD>
                  <TD mono>{d.size}</TD>
                  <TD>
                    {d.avScan === "clean"    && <span className="flex items-center gap-1 text-xs text-emerald-700 font-medium"><CheckCircle className="w-3.5 h-3.5" />Clean</span>}
                    {d.avScan === "scanning" && <span className="flex items-center gap-1 text-xs text-violet-700 font-medium"><RefreshCw className="w-3.5 h-3.5 animate-spin" />Scanning</span>}
                    {d.avScan === "infected" && <span className="flex items-center gap-1 text-xs text-red-700 font-medium"><XCircle className="w-3.5 h-3.5" />Infected</span>}
                  </TD>
                  <TD mono><span className="text-xs truncate max-w-[110px] block">{d.checksum}</span></TD>
                  <TD><StatusBadge status={d.status} /></TD>
                  <TD mono><span className="text-xs">{d.expires}</span></TD>
                  <TD onClick={e => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate("delivery-detail")} />
                      <Btn variant="ghost" size="xs" icon={Download} />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <Pagination total="1,091" shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Dashboard ────────────────────────────────────────────────
function ReporterDashboardScreen() {
  return (
    <Page title="Reporter Dashboard" breadcrumbs={["Reporter", "Dashboard"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Earned" value="$2,840" trend="+38%" trendUp icon={DollarSign} sub="all time" />
        <StatCard label="Published Reportages" value="47" trend="+5 this month" trendUp icon={FileText} />
        <StatCard label="Matching Requests" value="12" trend="3 new" trendUp icon={MessageSquare} />
        <StatCard label="Pending Withdrawal" value="$840" icon={Wallet} sub="awaiting transfer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart id="ch-reporter-earnings" data={REPORTER_EARNINGS_DATA} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDE3EF" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [`$${v}`, "Earned"]} contentStyle={{ fontSize: 12, border: "1px solid #DDE3EF", borderRadius: 6 }} />
              <Bar key="earned" dataKey="earned" name="Earned" fill="#1B4FDD" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">My Recent Reportages</h3>
            <Btn variant="primary" icon={Plus} size="xs">New Reportage</Btn>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50">
              <TH>ID</TH><TH>Title</TH><TH>Format</TH><TH>Price</TH><TH>Status</TH>
            </tr></thead>
            <tbody>
              {REPORTAGES.filter(r => r.reporter === "Elena Marchetti").slice(0, 4).map(r => (
                <tr key={r.id} className="hover:bg-secondary/30">
                  <TD mono>{r.id}</TD>
                  <TD><span className="max-w-[200px] block truncate font-medium">{r.title}</span></TD>
                  <TD><Chip color={r.format === "Video" ? "blue" : "amber"}>{r.format}</Chip></TD>
                  <TD mono>${r.price}</TD>
                  <TD><StatusBadge status={r.status} /></TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Open Reportage Requests</h3>
          <Btn variant="ghost" size="xs">View all</Btn>
        </div>
        <div className="divide-y divide-border">
          {[
            { id: "REQ-088", title: "Local elections coverage — Almaty, May 29", budget: 400, deadline: "2026-05-28", tags: ["Politics", "Video"] },
            { id: "REQ-087", title: "Industrial protest footage — Turin", budget: 250, deadline: "2026-05-26", tags: ["Labor", "Video"] },
            { id: "REQ-086", title: "Renewable energy project visuals — Astana", budget: 180, deadline: "2026-06-01", tags: ["Environment", "Photo"] },
          ].map(req => (
            <div key={req.id} className="px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{req.title}</div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="font-mono text-xs text-muted-foreground">{req.id}</span>
                  <span className="text-xs text-muted-foreground">· Deadline {req.deadline}</span>
                  {req.tags.map(t => <Chip key={t} color="gray">{t}</Chip>)}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="font-mono text-sm font-semibold">${req.budget}</span>
                <Btn variant="primary" size="xs">Respond</Btn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Customer Dashboard ────────────────────────────────────────────────
function CustomerDashboardScreen() {
  return (
    <Page title="Customer Dashboard" breadcrumbs={["Customer", "Dashboard"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Wallet Balance" value="$12,400" icon={Wallet} sub="available" />
        <StatCard label="Total Purchases" value="18" trend="+3 this month" trendUp icon={Package} />
        <StatCard label="Active Requests" value="4" icon={MessageSquare} sub="open" />
        <StatCard label="Pending Deliveries" value="2" icon={Truck} sub="ready to download" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent Purchases</h3>
            <Btn variant="ghost" size="xs">View all</Btn>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50"><TH>Reportage</TH><TH>Amount</TH><TH>Delivery</TH><TH>Date</TH></tr></thead>
            <tbody>
              {REPORTAGES.filter(r => r.buyer).map(r => (
                <tr key={r.id} className="hover:bg-secondary/30">
                  <TD><span className="max-w-[180px] block truncate font-medium">{r.title}</span></TD>
                  <TD mono>${r.price}</TD>
                  <TD><StatusBadge status="ready" /></TD>
                  <TD mono>{r.date}</TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold">My Reportage Requests</h3>
            <Btn variant="primary" icon={Plus} size="xs">New Request</Btn>
          </div>
          <div className="divide-y divide-border">
            {[
              { id: "REQ-081", title: "G7 Summit Side Events Coverage", budget: 600, status: "active", responses: 3 },
              { id: "REQ-079", title: "Tokyo Street Fashion Week 2026", budget: 220, status: "active", responses: 7 },
              { id: "REQ-075", title: "Sakura Season Documentary", budget: 350, status: "fulfilled", responses: 1 },
              { id: "REQ-068", title: "Sumo Championship Backstage", budget: 180, status: "expired", responses: 0 },
            ].map(req => (
              <div key={req.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{req.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-mono">{req.id} · {req.responses} response{req.responses !== 1 ? "s" : ""}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">${req.budget}</span>
                  <StatusBadge status={req.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Marketplace ───────────────────────────────────────────────────────
function MarketplaceScreen() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  const filtered = REPORTAGES.filter(r =>
    (catFilter === "all" || r.category === catFilter) &&
    (!search || r.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Page title="Marketplace" breadcrumbs={["GoDigiMarket", "Marketplace"]}>
      <div className="flex items-center gap-2.5 mb-4 flex-wrap">
        <SearchInput placeholder="Search reportages…" value={search} onChange={setSearch} />
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option value="all">All Categories</option>
          <option value="Environment">Environment</option>
          <option value="Politics">Politics</option>
          <option value="Culture">Culture</option>
          <option value="Labor">Labor</option>
          <option value="Business">Business</option>
          <option value="Social">Social</option>
        </select>
        <select className="text-sm px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          <option>All Formats</option><option>Video</option><option>Photo</option><option>Audio</option>
        </select>
        <div className="ml-auto flex items-center gap-1">
          <button onClick={() => setView("grid")} className={cn("p-1.5 rounded transition-colors", view === "grid" ? "bg-primary text-white" : "hover:bg-secondary text-muted-foreground")}>
            <Grid className="w-4 h-4" />
          </button>
          <button onClick={() => setView("list")} className={cn("p-1.5 rounded transition-colors", view === "list" ? "bg-primary text-white" : "hover:bg-secondary text-muted-foreground")}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(item => (
            <div key={item.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
              <div className="relative h-40 bg-muted">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-2 left-2">
                  <Chip color={item.format === "Video" ? "blue" : item.format === "Photo" ? "amber" : "sky"}>{item.format}</Chip>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[11px] font-mono px-1.5 py-0.5 rounded">
                  {item.duration}
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium line-clamp-2 mb-1.5 leading-snug">{item.title}</div>
                <div className="text-xs text-muted-foreground mb-2">{item.reporter} · {item.date}</div>
                <div className="flex items-center justify-between">
                  <Chip color="gray">{item.category}</Chip>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-primary">${item.price}</span>
                    <Btn variant="primary" size="xs">Buy</Btn>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr>
                <TH>Preview</TH><TH>Title</TH><TH>Reporter</TH><TH>Category</TH>
                <TH>Format</TH><TH>Duration</TH><TH>Price</TH><TH>Date</TH><TH></TH>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-secondary/30">
                  <TD>
                    <div className="w-16 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.img} alt="" className="w-full h-full object-cover" />
                    </div>
                  </TD>
                  <TD><span className="font-medium max-w-[200px] block truncate">{item.title}</span></TD>
                  <TD>{item.reporter}</TD>
                  <TD><Chip color="gray">{item.category}</Chip></TD>
                  <TD><Chip color={item.format === "Video" ? "blue" : "amber"}>{item.format}</Chip></TD>
                  <TD mono>{item.duration}</TD>
                  <TD mono>${item.price}</TD>
                  <TD mono>{item.date}</TD>
                  <TD><Btn variant="primary" size="xs">Buy</Btn></TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Wallet ────────────────────────────────────────────────────────────
function WalletScreen() {
  const [tab, setTab] = useState<"overview" | "deposit" | "history">("overview");

  return (
    <Page title="Wallet" breadcrumbs={["Account", "Wallet"]}>
      <div className="bg-primary rounded-lg p-5 mb-5 text-white flex items-start justify-between">
        <div>
          <div className="text-[11px] font-semibold opacity-60 uppercase tracking-widest mb-1">Available Balance</div>
          <div className="text-3xl font-semibold font-mono">$12,400.00</div>
          <div className="text-xs opacity-50 mt-1">Updated 2026-05-24 14:32 UTC</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("deposit")} className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-sm font-medium rounded-md transition-colors">
            Deposit
          </button>
          <button className="px-3 py-1.5 bg-white text-primary text-sm font-medium rounded-md hover:bg-white/90 transition-colors">
            Withdraw
          </button>
        </div>
      </div>

      <div className="flex gap-0.5 border-b border-border mb-4">
        {(["overview", "deposit", "history"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn(
            "px-3 py-2 text-sm capitalize border-b-2 -mb-px transition-colors",
            tab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"
          )}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Total Deposited" value="$19,400" icon={ArrowDownRight} sub="all time" />
            <StatCard label="Total Spent" value="$6,800" icon={ArrowUpRight} sub="purchases" />
            <StatCard label="Transactions" value="31" icon={Activity} sub="all time" />
          </div>
          <div className="bg-card border border-border rounded-lg">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="divide-y divide-border">
              {WALLET_TXS.map(tx => (
                <div key={tx.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", tx.amount > 0 ? "bg-emerald-50" : "bg-red-50")}>
                      {tx.amount > 0
                        ? <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                        : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{tx.desc}</div>
                      <div className="text-xs text-muted-foreground font-mono">{tx.id} · {tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("font-mono text-sm font-semibold", tx.amount > 0 ? "text-emerald-700" : "text-red-600")}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-mono">Bal: ${tx.balance.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "deposit" && (
        <div className="max-w-md">
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold">Deposit Funds</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input type="number" defaultValue="500" className="w-full pl-6 pr-3 py-2 text-sm border border-border rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div className="flex gap-2 mt-2">
                {[100, 500, 1000, 5000].map(amt => (
                  <button key={amt} className="px-2.5 py-1 text-xs border border-border rounded-md hover:bg-secondary hover:border-primary transition-colors">
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Payment Method</label>
              <select className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Wire Transfer</option>
                <option>Credit Card</option>
                <option>PayPal</option>
              </select>
            </div>
            <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-md p-3 text-xs flex items-start gap-2">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              Wire transfers may take 1–3 business days. You will be notified when funds are available.
            </div>
            <Btn variant="primary" size="md" full>Confirm Deposit</Btn>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-3 border-b border-border flex items-center gap-2.5">
            <SearchInput placeholder="Search transactions…" value="" onChange={() => {}} />
            <Btn variant="outline" icon={Calendar} size="xs">Date Range</Btn>
            <Btn variant="outline" icon={Download} size="xs">Export</Btn>
          </div>
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead className="bg-secondary/60">
              <tr><TH>ID</TH><TH>Description</TH><TH>Amount</TH><TH>Balance After</TH><TH>Status</TH><TH>Date</TH></tr>
            </thead>
            <tbody>
              {WALLET_TXS.map(tx => (
                <tr key={tx.id} className="hover:bg-secondary/30">
                  <TD mono>{tx.id}</TD>
                  <TD>{tx.desc}</TD>
                  <TD>
                    <span className={cn("font-mono text-sm font-semibold", tx.amount > 0 ? "text-emerald-700" : "text-red-600")}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </TD>
                  <TD mono>${tx.balance.toLocaleString("en", { minimumFractionDigits: 2 })}</TD>
                  <TD><StatusBadge status={tx.status} /></TD>
                  <TD mono>{tx.date}</TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Delivery Detail ────────────────────────────────────────────────────
function DeliveryDetailScreen() {
  const d = DELIVERIES[0];

  return (
    <Page title="Delivery Detail" breadcrumbs={["Admin", "Deliveries", d.id]}>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                  <StatusBadge status={d.status} />
                </div>
                <h2 className="text-base font-semibold">{d.reportage}</h2>
              </div>
              <Btn variant="primary" icon={Download}>Download All</Btn>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {[
                { label: "Reporter", value: d.reporter },
                { label: "Customer", value: d.customer },
                { label: "Files / Size", value: `${d.files} files · ${d.size}`, mono: true },
                { label: "Created", value: d.created, mono: true },
                { label: "Expires", value: d.expires, mono: true },
                { label: "AV Scan", el: <span className="flex items-center gap-1 text-emerald-700 font-medium"><CheckCircle className="w-3.5 h-3.5" />Clean</span> },
              ].map((item, i) => (
                <div key={i}>
                  <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                  {item.el ?? <div className={cn("font-medium", item.mono && "font-mono text-xs")}>{item.value}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />Integrity & Verification
            </h3>
            <div className="space-y-0">
              {[
                { label: "SHA-256 Checksum", value: d.checksum },
                { label: "File Count", value: `${d.files} files` },
                { label: "Total Size", value: d.size },
                { label: "AV Scan Engine", value: "ClamAV 1.4.1 + VirusTotal" },
                { label: "Scan Date", value: "2026-05-22 15:05:32 UTC" },
                { label: "Integrity Status", value: "Verified ✓" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-foreground">{item.value}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Files ({d.files})</h3>
            </div>
            <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
              <thead className="bg-secondary/60">
                <tr><TH>Filename</TH><TH>Type</TH><TH>Size</TH><TH>Checksum</TH><TH></TH></tr>
              </thead>
              <tbody>
                {[
                  { name: "aktobe_floods_main_4k.mp4", type: "video/mp4", size: "890 MB", csum: "sha256:f1a2...9c3d" },
                  { name: "aktobe_floods_broll.mp4",   type: "video/mp4", size: "210 MB", csum: "sha256:e8b7...2f1a" },
                  { name: "metadata_gps_transcript.pdf", type: "application/pdf", size: "1.2 MB", csum: "sha256:a3c9...7d4e" },
                ].map(f => (
                  <tr key={f.name} className="hover:bg-secondary/30">
                    <TD mono>{f.name}</TD>
                    <TD mono>{f.type}</TD>
                    <TD mono>{f.size}</TD>
                    <TD mono><span className="text-xs">{f.csum}</span></TD>
                    <TD><Btn variant="ghost" size="xs" icon={Download} /></TD>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Timeline</h3>
            <div className="space-y-3">
              {[
                { event: "Delivery created",   date: "2026-05-22 15:01", done: true },
                { event: "AV scan started",    date: "2026-05-22 15:01", done: true },
                { event: "AV scan passed",     date: "2026-05-22 15:05", done: true },
                { event: "Customer notified",  date: "2026-05-22 15:06", done: true },
                { event: "Files downloaded",   date: "—", done: false },
                { event: "Delivery expires",   date: "2026-06-05 15:01", done: false },
              ].map((ev, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className={cn("w-4 h-4 rounded-full border-2 mt-0.5 flex-shrink-0", ev.done ? "bg-primary border-primary" : "bg-white border-muted")} />
                  <div>
                    <div className="text-sm font-medium">{ev.event}</div>
                    <div className="text-xs text-muted-foreground font-mono">{ev.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold mb-1">Actions</h3>
            <Btn variant="primary" size="sm" full icon={Download}>Download All Files</Btn>
            <Btn variant="outline" size="sm" full icon={RefreshCw}>Regenerate Download Link</Btn>
            <Btn variant="destructive" size="sm" full icon={XCircle}>Revoke Access</Btn>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Linked Order</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="font-mono text-xs">ORD-8821</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount paid</span><span className="font-mono text-xs font-semibold">$180.00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment status</span><StatusBadge status="completed" /></div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── MapPlaceholder ─────────────────────────────────────────────────────────────
interface MapMarker { id: string; lat: number; lng: number; label: string; type?: string; onClick?: () => void; }
function MapPlaceholder({ markers = [], height = "h-80" }: { markers?: MapMarker[]; height?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className={cn("relative w-full rounded-lg border border-border overflow-hidden bg-[#e8eef5]", height)}
      style={{ backgroundImage: "linear-gradient(rgba(180,196,220,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(180,196,220,0.35) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #b8d0ee 0%, transparent 60%), radial-gradient(circle at 70% 30%, #c5d8ea 0%, transparent 50%)" }} />
      <div className="absolute bottom-2 right-2 bg-white/80 rounded px-2 py-1 text-[10px] text-muted-foreground border border-border">Map Preview</div>
      {markers.map(m => {
        const x = ((m.lng + 180) / 360) * 100;
        const y = ((90 - m.lat) / 180) * 100;
        return (
          <div key={m.id} className="absolute group"
            style={{ left: `${Math.max(2, Math.min(96, x))}%`, top: `${Math.max(2, Math.min(96, y))}%`, transform: "translate(-50%,-50%)" }}
            onMouseEnter={() => setHovered(m.id)} onMouseLeave={() => setHovered(null)}
            onClick={m.onClick}>
            <div className={cn("w-3 h-3 rounded-full border-2 border-white shadow cursor-pointer transition-transform hover:scale-125",
              m.type === "reporter" ? "bg-blue-500" : m.type === "request" ? "bg-amber-500" : m.type === "feed" ? "bg-emerald-500" : "bg-primary")} />
            {hovered === m.id && (
              <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 bg-foreground text-background text-[11px] px-2 py-1 rounded whitespace-nowrap shadow-lg z-10">
                {m.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Public Mock Data ───────────────────────────────────────────────────────────
const ARTICLES_DATA = [
  { id: "ART-001", title: "Digital Journalism in the Age of AI", category: "Technology", author: "Sofia Brennan", date: "2026-05-18", reads: 4821, img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80" },
  { id: "ART-002", title: "On-the-Ground: Crisis Reporting Ethics", category: "Ethics", author: "Mikael Johansson", date: "2026-05-14", reads: 3102, img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80" },
  { id: "ART-003", title: "Marketplace of Truth: Independent Reporters", category: "Industry", author: "Amara Diallo", date: "2026-05-10", reads: 5440, img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80" },
  { id: "ART-004", title: "Visual Storytelling: Photo vs. Video", category: "Craft", author: "Hiroshi Tanaka", date: "2026-05-06", reads: 2890, img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80" },
  { id: "ART-005", title: "How Syndication is Changing Local News", category: "Business", author: "Nadia Petrov", date: "2026-04-29", reads: 1760, img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80" },
  { id: "ART-006", title: "Field Equipment Guide for Conflict Zones", category: "Craft", author: "Omar Khalil", date: "2026-04-22", reads: 6310, img: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80" },
];

const REPORTER_MARKERS: MapMarker[] = [
  { id: "r1", lat: 48.8566, lng: 2.3522, label: "Sofia Brennan — Paris", type: "reporter" },
  { id: "r2", lat: 41.9028, lng: 12.4964, label: "Luca Rossi — Rome", type: "reporter" },
  { id: "r3", lat: 52.5200, lng: 13.4050, label: "Klaus Weber — Berlin", type: "reporter" },
  { id: "r4", lat: 40.7128, lng: -74.0060, label: "Maya Chen — New York", type: "reporter" },
  { id: "r5", lat: 35.6762, lng: 139.6503, label: "Hiroshi Tanaka — Tokyo", type: "reporter" },
  { id: "r6", lat: -23.5505, lng: -46.6333, label: "Carlos Mendes — São Paulo", type: "reporter" },
  { id: "r7", lat: 19.0760, lng: 72.8777, label: "Priya Nair — Mumbai", type: "reporter" },
  { id: "r8", lat: 55.7558, lng: 37.6176, label: "Nikolai Volkov — Moscow", type: "reporter" },
  { id: "r9", lat: -33.8688, lng: 151.2093, label: "James O'Brien — Sydney", type: "reporter" },
];

const REPORTAGE_MARKERS: MapMarker[] = [
  { id: "rp1", lat: 47.3769, lng: 8.5417, label: "Alpine Summit Coverage", type: "reportage" },
  { id: "rp2", lat: 51.5074, lng: -0.1278, label: "Westminster Protests", type: "reportage" },
  { id: "rp3", lat: 48.2082, lng: 16.3738, label: "Vienna Tech Forum", type: "reportage" },
  { id: "rp4", lat: 59.9139, lng: 10.7522, label: "Oslo Arctic Report", type: "reportage" },
  { id: "rp5", lat: 43.6532, lng: -79.3832, label: "Toronto Water Crisis", type: "reportage" },
  { id: "rp6", lat: 1.3521, lng: 103.8198, label: "Singapore Trade Summit", type: "reportage" },
  { id: "rp7", lat: -34.6037, lng: -58.3816, label: "Buenos Aires Inflation", type: "reportage" },
  { id: "rp8", lat: 30.0444, lng: 31.2357, label: "Cairo Infrastructure", type: "reportage" },
];

const REQUEST_MARKERS: MapMarker[] = [
  { id: "req1", lat: 50.8503, lng: 4.3517, label: "Brussels: EU Council Req", type: "request" },
  { id: "req2", lat: 37.9838, lng: 23.7275, label: "Athens: Elections Req", type: "request" },
  { id: "req3", lat: 25.2048, lng: 55.2708, label: "Dubai: Expo Coverage Req", type: "request" },
  { id: "req4", lat: -1.2921, lng: 36.8219, label: "Nairobi: Drought Req", type: "request" },
  { id: "req5", lat: 39.9042, lng: 116.4074, label: "Beijing: Forum Req", type: "request" },
  { id: "req6", lat: 6.5244, lng: 3.3792, label: "Lagos: Port Req", type: "request" },
];

const REQUESTS_DATA = [
  { id: "REQ-0041", title: "EU Council Emergency Session — Brussels", category: "Politics", budget: 850, deadline: "2026-06-05", status: "open", responses: 3 },
  { id: "REQ-0042", title: "Greek Elections First Round Coverage", category: "Politics", budget: 500, deadline: "2026-06-12", status: "open", responses: 7 },
  { id: "REQ-0043", title: "Dubai Expo Technology Pavilion", category: "Technology", budget: 1200, deadline: "2026-06-20", status: "assigned", responses: 5 },
  { id: "REQ-0044", title: "East Africa Drought — Ground Report", category: "Humanitarian", budget: 700, deadline: "2026-05-30", status: "open", responses: 2 },
  { id: "REQ-0045", title: "Beijing Green Energy Forum", category: "Environment", budget: 950, deadline: "2026-07-01", status: "open", responses: 4 },
];

type AdminRequestStatus = "open" | "assigned" | "fulfilled" | "expired" | "closed";
interface AdminRequestRow {
  id: string; title: string; category: string; budget: number;
  deadline: string; status: AdminRequestStatus;
  buyer: string; buyerAvatar: string; buyerOrg: string;
  location: string; description: string;
  formatPref: "Video" | "Photo" | "Audio" | "Any";
  urgent: boolean; createdAt: string;
  assignedReporter: string | null;
  responseCount: number;
}
interface RequestResponseRow {
  id: string; requestId: string;
  reporter: string; reporterAvatar: string; reporterCountry: string; reporterRating: number;
  message: string; proposedPrice: number;
  status: "pending" | "accepted" | "rejected";
  submittedAt: string;
}

const ADMIN_REQUESTS: AdminRequestRow[] = [
  { id: "REQ-0041", title: "EU Council Emergency Session — Brussels",  category: "Politics",      budget: 850,  deadline: "2026-06-05", status: "open",     buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",          location: "Brussels, Belgium",    description: "We need ground-level footage of the emergency EU Council session called in response to the eastern European situation. Specifically: arrival of heads of state, press briefing area, and any public demonstrations near the Council building. B-roll of the EU district is a plus.", formatPref: "Video", urgent: true,  createdAt: "2026-05-20", assignedReporter: null,              responseCount: 3 },
  { id: "REQ-0042", title: "Greek Elections First Round Coverage",      category: "Politics",      budget: 500,  deadline: "2026-06-12", status: "open",     buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",             location: "Athens, Greece",       description: "First-round parliamentary elections in Greece. Need footage from polling stations (exterior only), election night gatherings at party headquarters, and street reactions. Interviews with voters welcome but not required.", formatPref: "Video", urgent: false, createdAt: "2026-05-18", assignedReporter: null,              responseCount: 7 },
  { id: "REQ-0043", title: "Dubai Expo Technology Pavilion",            category: "Technology",    budget: 1200, deadline: "2026-06-20", status: "assigned", buyer: "Priya Nambiar",    buyerAvatar: "https://i.pravatar.cc/80?img=44", buyerOrg: "Dawn Wire Digital",       location: "Dubai, UAE",           description: "Full visual coverage of the Technology Pavilion at Dubai Expo. Focus on AI robotics demonstration zone, sustainable city installations, and the keynote stage. High-res photos preferred; video of robotics demos essential.", formatPref: "Any",   urgent: false, createdAt: "2026-05-15", assignedReporter: "Elena Marchetti", responseCount: 5 },
  { id: "REQ-0044", title: "East Africa Drought — Ground Report",       category: "Humanitarian",  budget: 700,  deadline: "2026-05-30", status: "open",     buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",          location: "Turkana, Kenya",       description: "Ongoing drought in northern Kenya's Turkana county is entering its second year. Seeking footage of affected communities, water distribution points, and interviews with NGO workers on the ground. Must be sensitive to dignity of subjects.", formatPref: "Video", urgent: true,  createdAt: "2026-05-22", assignedReporter: null,              responseCount: 2 },
  { id: "REQ-0045", title: "Beijing Green Energy Forum",                category: "Environment",   budget: 950,  deadline: "2026-07-01", status: "open",     buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",             location: "Beijing, China",       description: "International Green Energy Forum in Beijing. Need arrival coverage, exhibition floor, and official press conference footage. Mandarin-speaking reporter preferred but not required. Accreditation can be arranged.", formatPref: "Video", urgent: false, createdAt: "2026-05-19", assignedReporter: null,              responseCount: 4 },
  { id: "REQ-0046", title: "Lagos Tech Week Startup Showcase",          category: "Business",      budget: 420,  deadline: "2026-06-08", status: "fulfilled",buyer: "Priya Nambiar",    buyerAvatar: "https://i.pravatar.cc/80?img=44", buyerOrg: "Dawn Wire Digital",       location: "Lagos, Nigeria",       description: "Coverage of startup pitches and investor panels at Lagos Tech Week. Focus on African fintech and agritech founders. Short interview clips preferred.", formatPref: "Video", urgent: false, createdAt: "2026-05-10", assignedReporter: "Amara Diallo",    responseCount: 6 },
  { id: "REQ-0047", title: "Stockholm Climate Protest — May Demos",     category: "Environment",   budget: 300,  deadline: "2026-05-25", status: "expired",  buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",             location: "Stockholm, Sweden",    description: "Youth climate demonstrations planned for central Stockholm. Need crowd footage and 2–3 short interviews. Any format acceptable.", formatPref: "Any",   urgent: false, createdAt: "2026-05-12", assignedReporter: null,              responseCount: 1 },
  { id: "REQ-0048", title: "Almaty Flood Relief Operations",            category: "Humanitarian",  budget: 650,  deadline: "2026-06-02", status: "open",     buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",          location: "Almaty, Kazakhstan",   description: "Follow-up to the recent Aktobe floods — now covering relief operations near Almaty. Need footage of emergency services, temporary shelters, and official statements. Reporter must have local language capability.", formatPref: "Video", urgent: true,  createdAt: "2026-05-23", assignedReporter: null,              responseCount: 1 },
];

const REQUEST_RESPONSES: RequestResponseRow[] = [
  { id: "RR-001", requestId: "REQ-0041", reporter: "Elena Marchetti",  reporterAvatar: "https://i.pravatar.cc/80?img=47", reporterCountry: "Italy",      reporterRating: 4.9, message: "I'm based in Milan and can be in Brussels within 4 hours. I've covered three previous EU Council sessions and have press accreditation. Available from June 3.", proposedPrice: 820, status: "pending",  submittedAt: "2026-05-21 09:14" },
  { id: "RR-002", requestId: "REQ-0041", reporter: "Sasha Kovalenko",  reporterAvatar: "https://i.pravatar.cc/80?img=51", reporterCountry: "Ukraine",    reporterRating: 4.2, message: "Currently in Warsaw, 2 hours from Brussels. Can cover from arrival. No EU press accreditation but can obtain day pass.", proposedPrice: 780, status: "pending",  submittedAt: "2026-05-21 11:30" },
  { id: "RR-003", requestId: "REQ-0041", reporter: "Carl Henriksson",  reporterAvatar: "https://i.pravatar.cc/80?img=60", reporterCountry: "Sweden",     reporterRating: 4.6, message: "Based in Stockholm. Can travel same day. Full EU press credentials. Sony FX3 setup. Available entire week of June 3–7.", proposedPrice: 850, status: "pending",  submittedAt: "2026-05-22 08:05" },
  { id: "RR-004", requestId: "REQ-0042", reporter: "Elena Marchetti",  reporterAvatar: "https://i.pravatar.cc/80?img=47", reporterCountry: "Italy",      reporterRating: 4.9, message: "Have covered Greek politics since 2022. Strong local contacts and knowledge of Athens election geography. Can cover all three main party HQs on election night.", proposedPrice: 490, status: "accepted", submittedAt: "2026-05-19 14:22" },
  { id: "RR-005", requestId: "REQ-0043", reporter: "Elena Marchetti",  reporterAvatar: "https://i.pravatar.cc/80?img=47", reporterCountry: "Italy",      reporterRating: 4.9, message: "Assigned. Will cover full two-day programme including robotics keynote on day 1 and sustainability installations on day 2.", proposedPrice: 1150, status: "accepted", submittedAt: "2026-05-16 10:00" },
  { id: "RR-006", requestId: "REQ-0044", reporter: "Amara Diallo",     reporterAvatar: "https://i.pravatar.cc/80?img=23", reporterCountry: "Senegal",    reporterRating: 4.6, message: "Based in West Africa, can travel to Turkana with 48h notice. Have previous humanitarian coverage experience and understand ethical documentation requirements.", proposedPrice: 680, status: "pending",  submittedAt: "2026-05-23 07:55" },
  { id: "RR-007", requestId: "REQ-0044", reporter: "Daniyar Seitkali", reporterAvatar: "https://i.pravatar.cc/80?img=52", reporterCountry: "Kazakhstan", reporterRating: 4.7, message: "Experience covering East African humanitarian situations. Currently in Nairobi, 6 hours from Turkana. Can deploy immediately.", proposedPrice: 700, status: "pending",  submittedAt: "2026-05-23 12:40" },
  { id: "RR-008", requestId: "REQ-0048", reporter: "Daniyar Seitkali", reporterAvatar: "https://i.pravatar.cc/80?img=52", reporterCountry: "Kazakhstan", reporterRating: 4.7, message: "Native Kazakh speaker, based in Almaty. Already on the ground near the affected areas. Can start immediately.", proposedPrice: 620, status: "pending",  submittedAt: "2026-05-23 18:10" },
];

// ── Disputes mock data ─────────────────────────────────────────────────────────
type DisputeStatus = "open" | "under_review" | "awaiting_info" | "resolved" | "escalated" | "closed";
type DisputeReason = "quality" | "late_delivery" | "missing_content" | "unauthorized_use" | "payment" | "other";
type DisputeResolution = "buyer_refund" | "reporter_paid" | "partial_refund" | "no_action" | null;

interface DisputeRow {
  id: string;
  orderId: string;
  reportageTitle: string;
  buyer: string; buyerAvatar: string; buyerOrg: string;
  reporter: string; reporterAvatar: string; reporterCountry: string;
  amount: number;
  reason: DisputeReason;
  status: DisputeStatus;
  priority: "low" | "medium" | "high";
  openedAt: string;
  updatedAt: string;
  resolution: DisputeResolution;
  refundAmount: number | null;
  description: string;
  adminNote: string;
}
interface DisputeMessage {
  id: string; disputeId: string;
  sender: string; senderAvatar: string; senderRole: "buyer" | "reporter" | "admin";
  body: string; sentAt: string;
}

const DISPUTES: DisputeRow[] = [
  { id: "DSP-019", orderId: "ORD-2239", reportageTitle: "Street Art Festival Porto 2026",           buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",       reporter: "Elena Marchetti",  reporterAvatar: "https://i.pravatar.cc/80?img=47", reporterCountry: "Italy",      amount: 340,  reason: "quality",          status: "open",          priority: "high",   openedAt: "2026-05-20 14:32", updatedAt: "2026-05-20 14:32", resolution: null,           refundAmount: null, description: "The delivered photo set is missing the night parade sequence explicitly requested in the brief. Only 12 of 30 agreed deliverables were submitted. Requesting full refund or re-shoot.", adminNote: "" },
  { id: "DSP-018", orderId: "ORD-1930", reportageTitle: "Rome Climate March — April 2026",          buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",    reporter: "Elena Marchetti",  reporterAvatar: "https://i.pravatar.cc/80?img=47", reporterCountry: "Italy",      amount: 180,  reason: "late_delivery",    status: "resolved",      priority: "medium", openedAt: "2026-05-12 09:15", updatedAt: "2026-05-17 16:40", resolution: "buyer_refund", refundAmount: 180,  description: "Footage delivered 11 days after agreed deadline, causing NHK to miss broadcast window. Full payment was already processed. Requesting full refund.", adminNote: "Verified delivery timestamps. Reporter confirmed 11-day delay due to illness — not disclosed proactively. Full refund approved." },
  { id: "DSP-017", orderId: "ORD-1821", reportageTitle: "Istanbul Infrastructure Summit",           buyer: "Priya Nambiar",    buyerAvatar: "https://i.pravatar.cc/80?img=44", buyerOrg: "Dawn Wire Digital", reporter: "Sasha Kovalenko", reporterAvatar: "https://i.pravatar.cc/80?img=51", reporterCountry: "Ukraine",    amount: 520,  reason: "missing_content",  status: "under_review",  priority: "high",   openedAt: "2026-05-14 11:22", updatedAt: "2026-05-19 08:05", resolution: null,           refundAmount: null, description: "Video clips have audio sync issues throughout. The B-roll labelled 'Exhibition Hall C' actually depicts Hall A. Two promised interview clips not delivered.", adminNote: "Reviewing raw delivery package. Reporter claims files were correct at upload — may be encoding issue on our end." },
  { id: "DSP-016", orderId: "ORD-1755", reportageTitle: "Nairobi Fintech Expo 2026",               buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",    reporter: "Amara Diallo",     reporterAvatar: "https://i.pravatar.cc/80?img=23", reporterCountry: "Senegal",    amount: 290,  reason: "quality",          status: "awaiting_info", priority: "medium", openedAt: "2026-05-08 17:50", updatedAt: "2026-05-11 09:30", resolution: null,           refundAmount: null, description: "Resolution of video files is 720p, whereas the order specified 4K delivery. Some clips are overexposed and unusable.", adminNote: "Asked reporter to clarify equipment specs at time of shoot. Awaiting reply by 2026-05-13." },
  { id: "DSP-015", orderId: "ORD-1690", reportageTitle: "Vienna Philharmonic Gala Night",          buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",       reporter: "Carl Henriksson",  reporterAvatar: "https://i.pravatar.cc/80?img=60", reporterCountry: "Sweden",     amount: 450,  reason: "payment",          status: "escalated",     priority: "high",   openedAt: "2026-05-01 10:05", updatedAt: "2026-05-18 14:22", resolution: null,           refundAmount: null, description: "Reporter claims payment was not released despite delivery being marked complete 18 days ago. Platform ledger shows funds held in escrow without release trigger.", adminNote: "Escalated to finance team. Escrow release mechanism failed — known bug in payout batch processor (JIRA FIN-228). Manual release needed." },
  { id: "DSP-014", orderId: "ORD-1601", reportageTitle: "Copenhagen Cycling Race Coverage",        buyer: "Priya Nambiar",    buyerAvatar: "https://i.pravatar.cc/80?img=44", buyerOrg: "Dawn Wire Digital", reporter: "Carl Henriksson",  reporterAvatar: "https://i.pravatar.cc/80?img=60", reporterCountry: "Sweden",     amount: 210,  reason: "other",            status: "closed",        priority: "low",    openedAt: "2026-04-22 08:30", updatedAt: "2026-04-29 12:15", resolution: "no_action",    refundAmount: null, description: "Buyer claims reporter used their footage in a personal social media post without permission. Reporter denies this.", adminNote: "Reviewed reporter's social accounts — no evidence found. Buyer did not provide screenshot evidence. Closed without action." },
  { id: "DSP-013", orderId: "ORD-1540", reportageTitle: "Lagos Maritime Port Expansion",           buyer: "Takeshi Morita",   buyerAvatar: "https://i.pravatar.cc/80?img=68", buyerOrg: "NHK World News",    reporter: "Amara Diallo",     reporterAvatar: "https://i.pravatar.cc/80?img=23", reporterCountry: "Senegal",    amount: 380,  reason: "quality",          status: "resolved",      priority: "medium", openedAt: "2026-04-15 13:44", updatedAt: "2026-04-24 10:00", resolution: "partial_refund", refundAmount: 120, description: "Footage acceptable overall but 4 clips have severe wind noise making them unusable for broadcast. Requesting partial refund for those clips.", adminNote: "Agreed partial refund of $120 for 4 affected clips. Reporter accepted terms. Order marked complete for remaining deliverables." },
  { id: "DSP-012", orderId: "ORD-1488", reportageTitle: "Kyiv Reconstruction Progress — Q2 2026", buyer: "Carl Henriksson",  buyerAvatar: "https://i.pravatar.cc/80?img=60", buyerOrg: "SVT Nyheter",       reporter: "Sasha Kovalenko", reporterAvatar: "https://i.pravatar.cc/80?img=51", reporterCountry: "Ukraine",    amount: 600,  reason: "unauthorized_use", status: "under_review",  priority: "high",   openedAt: "2026-04-10 16:20", updatedAt: "2026-05-05 09:45", resolution: null,           refundAmount: null, description: "Buyer discovered that several delivered images were resold to a competing outlet (Reuters) simultaneously. Exclusive licence was clearly specified in the contract.", adminNote: "Contacted reporter for explanation. Waiting for response. Cross-referencing image metadata and Reuters publication timestamps." },
];

const DISPUTE_MESSAGES: DisputeMessage[] = [
  { id: "DM-001", disputeId: "DSP-019", sender: "Carl Henriksson",  senderAvatar: "https://i.pravatar.cc/80?img=60", senderRole: "buyer",    body: "I've attached the original brief highlighting the night parade requirement. The delivered set has zero photos from after 19:00.",                                                                                      sentAt: "2026-05-20 14:32" },
  { id: "DM-002", disputeId: "DSP-019", sender: "Elena Marchetti",  senderAvatar: "https://i.pravatar.cc/80?img=47", senderRole: "reporter", body: "The night parade was cancelled by the festival organizers. I informed the platform via the delivery notes field. The remaining 12 photos cover everything else in scope.",                               sentAt: "2026-05-20 17:05" },
  { id: "DM-003", disputeId: "DSP-019", sender: "Admin",            senderAvatar: "",                                senderRole: "admin",    body: "We are reviewing the delivery notes and the original brief. Please allow 48 hours for investigation.",                                                                                         sentAt: "2026-05-21 09:00" },
  { id: "DM-004", disputeId: "DSP-018", sender: "Takeshi Morita",   senderAvatar: "https://i.pravatar.cc/80?img=68", senderRole: "buyer",    body: "The broadcast window for the Rome march story was May 13. Footage arrived May 23. This is completely unacceptable for news content.",                                                              sentAt: "2026-05-12 09:15" },
  { id: "DM-005", disputeId: "DSP-018", sender: "Elena Marchetti",  senderAvatar: "https://i.pravatar.cc/80?img=47", senderRole: "reporter", body: "I was hospitalised from May 10–15. This was a genuine emergency. I apologise for not notifying the platform immediately.",                                                                            sentAt: "2026-05-13 14:30" },
  { id: "DM-006", disputeId: "DSP-018", sender: "Admin",            senderAvatar: "",                                senderRole: "admin",    body: "After review, we have approved a full refund of $180.00. The reporter's account will not be penalised given the medical emergency, but a formal warning has been logged.",                        sentAt: "2026-05-17 16:40" },
  { id: "DM-007", disputeId: "DSP-017", sender: "Priya Nambiar",    senderAvatar: "https://i.pravatar.cc/80?img=44", senderRole: "buyer",    body: "The audio is at least 1.5 seconds out of sync in every clip. This makes post-production extremely costly. The Hall labelling errors wasted 3 hours of our editors' time.",                        sentAt: "2026-05-14 11:22" },
  { id: "DM-008", disputeId: "DSP-017", sender: "Sasha Kovalenko",  senderAvatar: "https://i.pravatar.cc/80?img=51", senderRole: "reporter", body: "Files were perfect when I submitted them — I have the original ProRes masters. This sounds like a transcoding issue on the platform side. Happy to re-upload originals.",                         sentAt: "2026-05-15 08:45" },
];

const FEED_MARKERS: MapMarker[] = [
  { id: "f1", lat: 48.8566, lng: 2.3522, label: "Le Monde — Paris", type: "feed" },
  { id: "f2", lat: 51.5074, lng: -0.1278, label: "The Guardian — London", type: "feed" },
  { id: "f3", lat: 40.7128, lng: -74.0060, label: "AP Wire — New York", type: "feed" },
  { id: "f4", lat: 35.6762, lng: 139.6503, label: "NHK World — Tokyo", type: "feed" },
  { id: "f5", lat: 52.5200, lng: 13.4050, label: "DW News — Berlin", type: "feed" },
  { id: "f6", lat: -33.8688, lng: 151.2093, label: "ABC News — Sydney", type: "feed" },
  { id: "f7", lat: 55.7558, lng: 37.6176, label: "TASS Wire — Moscow", type: "feed" },
];

// ── SCREEN: Login ──────────────────────────────────────────────────────────────
function LoginScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-foreground">GoDigiMarket</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <button onClick={() => onNavigate("reset-password")} className="text-xs text-primary hover:underline">Forgot password?</button>
            </div>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
              className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          <Btn variant="primary" full>Sign In</Btn>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          No account?{" "}
          <button onClick={() => onNavigate("register")} className="text-primary font-medium hover:underline">Create one</button>
        </p>
        <button onClick={() => onNavigate("marketplace")} className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
          <ChevronLeft className="w-3 h-3" /> Back to marketplace
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: Register ───────────────────────────────────────────────────────────
function RegisterScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [role, setRole] = useState<"customer" | "reporter">("customer");
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-foreground">GoDigiMarket</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the digital reportage marketplace</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex gap-2 p-1 bg-muted rounded-md">
            {(["customer", "reporter"] as const).map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={cn("flex-1 py-1.5 text-sm rounded font-medium transition-colors capitalize",
                  role === r ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {r === "customer" ? "Customer" : "Reporter"}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">First name</label>
              <input placeholder="Jane" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Last name</label>
              <input placeholder="Doe" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email address</label>
            <input type="email" placeholder="you@example.com" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" placeholder="Min. 8 characters" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
          </div>
          {role === "reporter" && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Specialization</label>
              <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                <option>Conflict & War</option>
                <option>Politics</option>
                <option>Technology</option>
                <option>Environment</option>
                <option>Business</option>
              </select>
            </div>
          )}
          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" className="mt-0.5 w-4 h-4 accent-primary cursor-pointer" />
            <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
              I agree to the <span className="text-primary">Terms of Service</span> and <span className="text-primary">Privacy Policy</span>
            </label>
          </div>
          <Btn variant="primary" full>Create Account</Btn>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <button onClick={() => onNavigate("login")} className="text-primary font-medium hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  );
}

// ── SCREEN: Reset Password ─────────────────────────────────────────────────────
function ResetPasswordScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-foreground">GoDigiMarket</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">Reset password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your email to receive a reset link</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          {sent ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-sm text-foreground font-medium">Check your inbox</p>
              <p className="text-xs text-muted-foreground">We sent a reset link to your email. It expires in 30 minutes.</p>
              <Btn variant="outline" full onClick={() => setSent(false)}>Send again</Btn>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email address</label>
                <input type="email" placeholder="you@example.com" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
              </div>
              <Btn variant="primary" full onClick={() => setSent(true)}>Send Reset Link</Btn>
            </>
          )}
        </div>
        <button onClick={() => onNavigate("login")} className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
          <ChevronLeft className="w-3 h-3" /> Back to sign in
        </button>
      </div>
    </div>
  );
}

// ── SCREEN: Articles List ──────────────────────────────────────────────────────
function ArticlesListScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", "Technology", "Ethics", "Industry", "Craft", "Business"];
  const filtered = useMemo(() => ARTICLES_DATA.filter(a =>
    (cat === "All" || a.category === cat) &&
    (a.title.toLowerCase().includes(q.toLowerCase()) || a.author.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);
  return (
    <Page title="Articles" breadcrumbs={["Marketplace", "Articles"]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <SearchInput placeholder="Search articles..." value={q} onChange={setQ} />
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("px-3 py-1.5 text-xs rounded-md font-medium border transition-colors",
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground")}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(a => (
          <div key={a.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onNavigate("article-detail")}>
            <div className="h-40 overflow-hidden">
              <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Chip color="blue">{a.category}</Chip>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2">{a.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.author}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{a.reads.toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{a.date}</div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium">No articles found</p>
          <p className="text-xs text-muted-foreground mt-1">Try adjusting your search or category filter</p>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Article Detail ─────────────────────────────────────────────────────
function ArticleDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const a = ARTICLES_DATA[0];
  return (
    <Page title={a.title} breadcrumbs={["Marketplace", "Articles", a.title]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div>
          <div className="rounded-lg overflow-hidden mb-5 h-64">
            <img src={a.img} alt={a.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Chip color="blue">{a.category}</Chip>
            <span className="text-xs text-muted-foreground">{a.date}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Eye className="w-3 h-3" />{a.reads.toLocaleString()} reads</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground leading-tight mb-2">{a.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">By <span className="text-foreground font-medium">{a.author}</span></p>
          <div className="prose prose-sm max-w-none text-foreground space-y-4">
            {["The rapid proliferation of AI-generated content has placed traditional journalism at a crossroads. Publishers and independent reporters alike face the dual challenge of maintaining credibility while competing with algorithmically produced articles that can flood feeds within seconds of an event.",
              "GoDigiMarket was founded on the premise that authentic, ground-level reporting has intrinsic value that automated systems cannot replicate. The human eye, the physical presence, the contextual judgment — these remain irreplaceable assets in the information ecosystem.",
              "Reporters on the platform operate under a verified credential system, with each piece of work traceable to a real identity, a physical location, and a timestamp chain. Buyers can inspect the provenance metadata of any reportage before committing funds.",
              "The platform has seen a 340% increase in verified reportage submissions over the past 18 months, with strong growth in coverage from underrepresented regions. Africa, Southeast Asia, and Central America now collectively account for 28% of total supply — up from 9% in 2024."
            ].map((p, i) => <p key={i} className="leading-relaxed">{p}</p>)}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">About the Author</h4>
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={a.author} size="lg" />
              <div>
                <p className="text-sm font-medium">{a.author}</p>
                <p className="text-xs text-muted-foreground">Senior Editor</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Covering digital media transformation and press freedom for 8 years.</p>
            <button onClick={() => onNavigate("reporter-profile")} className="mt-3 w-full text-xs text-primary font-medium hover:underline text-left">View full profile →</button>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Related Articles</h4>
            <div className="space-y-3">
              {ARTICLES_DATA.slice(1, 4).map(r => (
                <button key={r.id} onClick={() => onNavigate("article-detail")} className="block text-left group">
                  <p className="text-xs font-medium text-foreground group-hover:text-primary line-clamp-2 leading-snug">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{r.category} · {r.author}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Share</h4>
            <div className="flex gap-2">
              {["Twitter/X", "LinkedIn", "Copy Link"].map(s => (
                <button key={s} className="flex-1 py-1.5 text-[11px] bg-muted rounded font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Page ───────────────────────────────────────────────────────────
function CMSPageScreen() {
  return (
    <Page title="About GoDigiMarket" breadcrumbs={["Marketplace", "About"]}>
      <div className="max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
          <div className="h-48 bg-gradient-to-r from-primary/10 to-secondary flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-semibold text-foreground">GoDigiMarket</h1>
              <p className="text-sm text-muted-foreground mt-1">The verified marketplace for digital reportages</p>
            </div>
          </div>
          <div className="p-6 space-y-5">
            {[
              { heading: "Our Mission", body: "GoDigiMarket connects verified field reporters with organizations, publishers, and individuals who need authentic, on-the-ground digital content. We believe in the power of real journalism — documented, traceable, and fairly compensated." },
              { heading: "How It Works", body: "Reporters submit reportages in photo, video, and audio formats. Each submission undergoes AV scanning, integrity verification, and editorial review before appearing in the marketplace. Customers browse by topic, region, or reporter, and purchase perpetual licenses or time-limited subscriptions." },
              { heading: "Verification & Trust", body: "All reporters on the platform undergo identity verification. Content is hash-signed at submission, and the full provenance chain — from device to delivery — is available to buyers. Disputes are handled by our moderation team with a 48-hour SLA." },
              { heading: "Pricing & Fees", body: "GoDigiMarket charges a 15% platform fee on all transactions. Reporters receive 85% of their listed price, paid weekly to their in-platform wallet. Customers pay only for what they use — there are no mandatory subscription fees for individual purchases." },
            ].map(s => (
              <section key={s.heading}>
                <h2 className="text-base font-semibold text-foreground mb-2">{s.heading}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{ v: "12,400+", l: "Verified Reportages" }, { v: "840", l: "Active Reporters" }, { v: "62 countries", l: "Coverage Regions" }].map(s => (
            <div key={s.l} className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-xl font-semibold font-mono text-foreground">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reporters Map ──────────────────────────────────────────────────────
function ReportersMapScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"map" | "list">("map");
  const reporters = [
    { name: "Sofia Brennan", location: "Paris, France", spec: "Politics", rate: 420, rating: 4.9, reportages: 62 },
    { name: "Luca Rossi", location: "Rome, Italy", spec: "Culture", rate: 380, rating: 4.7, reportages: 44 },
    { name: "Klaus Weber", location: "Berlin, Germany", spec: "Technology", rate: 500, rating: 4.8, reportages: 78 },
    { name: "Maya Chen", location: "New York, USA", spec: "Finance", rate: 650, rating: 5.0, reportages: 93 },
    { name: "Hiroshi Tanaka", location: "Tokyo, Japan", spec: "Technology", rate: 470, rating: 4.6, reportages: 55 },
    { name: "Carlos Mendes", location: "São Paulo, Brazil", spec: "Environment", rate: 320, rating: 4.5, reportages: 38 },
  ];
  return (
    <Page title="Reporters Map" breadcrumbs={["Marketplace", "Reporters"]}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search by name, location, specialty..." value="" onChange={() => {}} /></div>
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["map", "list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1 text-xs rounded font-medium capitalize transition-colors",
                view === v ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {v === "map" ? <><span className="hidden sm:inline">Map</span></> : <><span className="hidden sm:inline">List</span></>}
              {v}
            </button>
          ))}
        </div>
      </div>
      {view === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          <MapPlaceholder markers={REPORTER_MARKERS} height="h-[480px]" />
          <div className="space-y-2 overflow-y-auto max-h-[480px]">
            {reporters.map(r => (
              <button key={r.name} onClick={() => onNavigate("reporter-profile")}
                className="w-full bg-card border border-border rounded-lg p-3 text-left hover:border-primary/50 hover:shadow-sm transition-all">
                <div className="flex items-center gap-2.5">
                  <Avatar name={r.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{r.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono font-semibold text-foreground">${r.rate}</p>
                    <p className="text-[10px] text-muted-foreground">avg/reportage</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Chip color="blue">{r.spec}</Chip>
                  <span className="text-[11px] text-muted-foreground">⭐ {r.rating} · {r.reportages} works</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr>
              <TH>Reporter</TH><TH>Location</TH><TH>Specialty</TH>
              <TH>Avg Rate</TH><TH>Rating</TH><TH>Works</TH><TH></TH>
            </tr></thead>
            <tbody>
              {reporters.map(r => (
                <tr key={r.name} className="hover:bg-muted/30">
                  <TD><div className="flex items-center gap-2"><Avatar name={r.name} /><span className="font-medium">{r.name}</span></div></TD>
                  <TD>{r.location}</TD>
                  <TD><Chip color="blue">{r.spec}</Chip></TD>
                  <TD mono>${r.rate}</TD>
                  <TD>⭐ {r.rating}</TD>
                  <TD mono>{r.reportages}</TD>
                  <TD><button onClick={() => onNavigate("reporter-profile")} className="text-xs text-primary hover:underline">View profile</button></TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Reporter Public Profile ───────────────────────────────────────────
function ReporterProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const reporter = { name: "Maya Chen", location: "New York, USA", spec: "Finance & Business", rate: 650, rating: 5.0, reportages: 93, bio: "Award-winning financial journalist with 12 years covering Wall Street, central bank policy, and emerging markets. Previously at Bloomberg and Financial Times. Certified by WAN-IFRA.", joined: "2024-03-10", verified: true };
  return (
    <Page title="Reporter Profile" breadcrumbs={["Marketplace", "Reporters", reporter.name]}>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 text-center">
            <div className="w-20 h-20 rounded-full bg-primary text-white text-2xl font-semibold flex items-center justify-center mx-auto mb-3">
              {reporter.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="font-semibold text-foreground">{reporter.name}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{reporter.location}</p>
            {reporter.verified && (
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Verified Reporter
              </div>
            )}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
              {[{ v: reporter.reportages, l: "Works" }, { v: `$${reporter.rate}`, l: "Avg Rate" }, { v: reporter.rating, l: "Rating" }].map(s => (
                <div key={s.l} className="text-center">
                  <div className="text-base font-semibold font-mono text-foreground">{s.v}</div>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold">Details</h4>
            {[{ l: "Specialty", v: reporter.spec }, { l: "Joined", v: reporter.joined }, { l: "Avg delivery", v: "3-5 days" }, { l: "Languages", v: "EN, ZH, FR" }].map(d => (
              <div key={d.l} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{d.l}</span>
                <span className="font-medium">{d.v}</span>
              </div>
            ))}
          </div>
          <Btn variant="primary" full>Request Reportage</Btn>
          <Btn variant="outline" full onClick={() => onNavigate("reporter-portfolio")}>View Portfolio</Btn>
        </div>
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{reporter.bio}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Recent Reportages</h4>
              <button onClick={() => onNavigate("reporter-portfolio")} className="text-xs text-primary hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {REPORTAGES.slice(0, 6).map(r => (
                <div key={r.id} className="rounded-md overflow-hidden border border-border cursor-pointer group"
                  onClick={() => onNavigate("reportage-detail")}>
                  <div className="h-24 overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-snug">{r.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">${r.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Portfolio ─────────────────────────────────────────────────
function ReporterPortfolioScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [fmt, setFmt] = useState<"photo" | "video" | "audio">("photo");
  const photoItems = REPORTAGES.filter(r => r.type === "photo");
  const videoItems = REPORTAGES.filter(r => r.type === "video");
  const audioItems = [
    { id: "AU-001", title: "Interview: UN Special Envoy on Climate", duration: "18:42", date: "2026-04-10", plays: 1240 },
    { id: "AU-002", title: "Field Recording: Lagos Port Strike Day 3", duration: "34:15", date: "2026-03-28", plays: 890 },
    { id: "AU-003", title: "Roundtable: Digital Press Freedom 2026", duration: "51:07", date: "2026-03-12", plays: 2100 },
  ];
  return (
    <Page title="Portfolio — Maya Chen" breadcrumbs={["Reporters", "Maya Chen", "Portfolio"]}>
      <div className="flex items-center gap-3 mb-5">
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["photo", "video", "audio"] as const).map(f => (
            <button key={f} onClick={() => setFmt(f)}
              className={cn("px-4 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                fmt === f ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {fmt === "photo" ? photoItems.length : fmt === "video" ? videoItems.length : audioItems.length} items
        </span>
      </div>
      {fmt === "photo" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(photoItems.length ? photoItems : REPORTAGES.slice(0, 8)).map(r => (
            <div key={r.id} className="rounded-lg overflow-hidden border border-border cursor-pointer group"
              onClick={() => onNavigate("reportage-detail")}>
              <div className="h-36 overflow-hidden relative">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
              </div>
              <div className="p-2.5">
                <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-snug">{r.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <Chip color="gray">{r.category}</Chip>
                  <span className="text-[10px] font-mono font-semibold text-foreground">${r.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {fmt === "video" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(videoItems.length ? videoItems : REPORTAGES.slice(0, 6)).map(r => (
            <div key={r.id} className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onNavigate("reportage-detail")}>
              <div className="h-44 relative overflow-hidden bg-muted">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-foreground border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-foreground/70 text-background text-[10px] px-1.5 py-0.5 rounded font-mono">4:32</div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">{r.title}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <Chip color="sky">{r.category}</Chip>
                  <span className="text-xs font-mono font-semibold">${r.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {fmt === "audio" && (
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {audioItems.map(a => (
            <div key={a.id} className="flex items-center gap-4 p-4 hover:bg-muted/30">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-primary border-b-[7px] border-b-transparent ml-0.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.date} · {a.plays.toLocaleString()} plays</p>
              </div>
              <span className="font-mono text-sm text-muted-foreground">{a.duration}</span>
              <Btn variant="outline" size="sm">Preview</Btn>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Reportages Map ─────────────────────────────────────────────────────
function ReportagesMapScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"map" | "list">("map");
  const [cat, setCat] = useState("All");
  const cats = ["All", "Politics", "Technology", "Environment", "Business", "Conflict"];
  const filtered = useMemo(() => cat === "All" ? REPORTAGES : REPORTAGES.filter(r => r.category === cat), [cat]);
  return (
    <Page title="Reportages" breadcrumbs={["Marketplace", "Reportages"]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search reportages..." value="" onChange={() => {}} /></div>
        <div className="flex gap-1.5 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cn("px-2.5 py-1 text-xs rounded font-medium border transition-colors",
                cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground")}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-md flex-shrink-0">
          {(["map", "list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1 text-xs rounded font-medium capitalize transition-colors",
                view === v ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {v}
            </button>
          ))}
        </div>
      </div>
      {view === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <MapPlaceholder markers={REPORTAGE_MARKERS} height="h-[480px]" />
          <div className="space-y-2 overflow-y-auto max-h-[480px]">
            {filtered.map(r => (
              <button key={r.id} onClick={() => onNavigate("reportage-detail")}
                className="w-full bg-card border border-border rounded-lg overflow-hidden text-left hover:border-primary/50 hover:shadow-sm transition-all flex gap-3">
                <div className="w-20 flex-shrink-0 overflow-hidden">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2.5 flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">{r.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{r.reporter} · {r.country}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Chip color="gray">{r.category}</Chip>
                    <span className="text-[11px] font-mono font-semibold text-foreground">${r.price}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => onNavigate("reportage-detail")}>
              <div className="h-40 overflow-hidden">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <Chip color="gray">{r.category}</Chip>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.reporter} · {r.country}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-mono font-semibold text-foreground">${r.price}</span>
                  <Btn variant="primary" size="sm">Purchase</Btn>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Reportage Detail ───────────────────────────────────────────────────
function ReportageDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const r = REPORTAGES[0];
  return (
    <Page title={r.title} breadcrumbs={["Marketplace", "Reportages", r.title]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div>
          <div className="rounded-lg overflow-hidden mb-5 h-72">
            <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Chip color="gray">{r.category}</Chip>
            <StatusBadge status={r.status} />
            <span className="text-xs text-muted-foreground">{r.date}</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground leading-snug mb-2">{r.title}</h1>
          <button onClick={() => onNavigate("reporter-profile")} className="flex items-center gap-2 mb-4 text-sm text-muted-foreground hover:text-primary">
            <Avatar name={r.reporter} />
            <span className="font-medium">{r.reporter}</span>
            <span>·</span>
            <span>{r.country}</span>
          </button>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            An in-depth reportage covering the latest developments in {r.category.toLowerCase()} across the region. Shot over 3 days with high-resolution equipment, this package includes raw interview transcripts, location-stamped photographs, and a documentary-style video overview.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[{ l: "Files", v: "12 items" }, { l: "Duration", v: "4:32 min" }, { l: "Resolution", v: "4K UHD" }, { l: "Location", v: r.country }].map(s => (
              <div key={s.l} className="bg-card border border-border rounded-md p-3 text-center">
                <div className="text-sm font-semibold font-mono">{s.v}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Included Files</h4>
            <div className="space-y-2">
              {[
                { name: "main_video_4k.mp4", size: "2.1 GB", type: "Video" },
                { name: "photos_bundle.zip", size: "840 MB", type: "Photos" },
                { name: "transcript_en.pdf", size: "1.2 MB", type: "Document" },
                { name: "location_data.json", size: "48 KB", type: "Data" },
              ].map(f => (
                <div key={f.name} className="flex items-center gap-3 text-xs">
                  <div className="w-7 h-7 rounded bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="font-mono flex-1 truncate">{f.name}</span>
                  <span className="text-muted-foreground">{f.size}</span>
                  <Chip color="gray">{f.type}</Chip>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-3xl font-semibold font-mono text-foreground mb-1">${r.price}</div>
            <p className="text-xs text-muted-foreground mb-4">One-time license · Perpetual use</p>
            <Btn variant="primary" full>Purchase Reportage</Btn>
            <Btn variant="outline" full className="mt-2">Add to Bookmarks</Btn>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-xs">
            <h4 className="font-semibold text-sm mb-3">License Details</h4>
            {[["Type", "Commercial"], ["Usage", "Worldwide"], ["Duration", "Perpetual"], ["Sublicensing", "Not permitted"], ["Attribution", "Required"]].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Integrity Verification</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> AV scan: Clean</div>
              <div className="flex items-center gap-2 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> Hash verified</div>
              <div className="flex items-center gap-2 text-emerald-600"><CheckCircle className="w-3.5 h-3.5" /> GPS metadata intact</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> Last checked: 2h ago</div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reportage Requests Map ─────────────────────────────────────────────
function RequestsMapScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"map" | "list">("map");
  return (
    <Page title="Reportage Requests" breadcrumbs={["Marketplace", "Requests"]}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search requests by topic or location..." value="" onChange={() => {}} /></div>
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["map", "list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1 text-xs rounded font-medium capitalize transition-colors",
                view === v ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {v}
            </button>
          ))}
        </div>
        <Btn variant="primary" size="sm" icon={Plus}>Post Request</Btn>
      </div>
      {view === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <MapPlaceholder markers={REQUEST_MARKERS} height="h-[460px]" />
          <div className="space-y-2 overflow-y-auto max-h-[460px]">
            {REQUESTS_DATA.map(r => (
              <button key={r.id} onClick={() => onNavigate("request-detail")}
                className="w-full bg-card border border-border rounded-lg p-3 text-left hover:border-primary/50 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-xs font-semibold text-foreground leading-snug line-clamp-2">{r.title}</p>
                  <StatusBadge status={r.status} />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Chip color="amber">{r.category}</Chip>
                  <span className="text-[11px] font-mono font-semibold text-foreground">${r.budget}</span>
                  <span className="text-[11px] text-muted-foreground">· {r.responses} responses</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">Deadline: {r.deadline}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
            <thead><tr>
              <TH>Request</TH><TH>Category</TH><TH>Budget</TH>
              <TH>Deadline</TH><TH>Responses</TH><TH>Status</TH><TH></TH>
            </tr></thead>
            <tbody>
              {REQUESTS_DATA.map(r => (
                <tr key={r.id} className="hover:bg-muted/30">
                  <TD><div className="font-medium text-sm max-w-[260px] truncate">{r.title}</div></TD>
                  <TD><Chip color="amber">{r.category}</Chip></TD>
                  <TD mono>${r.budget}</TD>
                  <TD>{r.deadline}</TD>
                  <TD mono>{r.responses}</TD>
                  <TD><StatusBadge status={r.status} /></TD>
                  <TD><button onClick={() => onNavigate("request-detail")} className="text-xs text-primary hover:underline">View</button></TD>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Request Detail ─────────────────────────────────────────────────────
function RequestDetailScreen() {
  const r = REQUESTS_DATA[0];
  return (
    <Page title={r.title} breadcrumbs={["Marketplace", "Requests", r.id]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Chip color="amber">{r.category}</Chip>
              <StatusBadge status={r.status} />
              <span className="text-xs font-mono text-muted-foreground">{r.id}</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground leading-snug mb-3">{r.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We require on-the-ground coverage of this event including video footage, high-resolution photography, and written summary. The assignment requires physical presence at the location for a minimum of 2 days. All raw materials must be submitted within 24 hours of the deadline.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h4 className="text-sm font-semibold mb-3">Requirements</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Minimum 20 high-resolution photos (≥ 20MP)", "At least 5 minutes of 4K video footage", "Written summary (500–1000 words) in English", "GPS-tagged all media files", "Delivery within 24h of event completion", "Reporter must be physically present"].map(req => (
                <li key={req} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold">Responses ({r.responses})</h4>
              <Btn variant="outline" size="sm">View All</Btn>
            </div>
            <div className="space-y-3">
              {[{ name: "Klaus Weber", loc: "Berlin", rate: 520, note: "Available on-site from June 3rd." }, { name: "Sofia Brennan", loc: "Paris", rate: 600, note: "Experienced in EU institutional coverage." }].map(resp => (
                <div key={resp.name} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
                  <Avatar name={resp.name} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{resp.name} <span className="text-muted-foreground font-normal text-xs">({resp.loc})</span></p>
                      <span className="text-sm font-mono font-semibold">${resp.rate}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{resp.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Request Details</h4>
            <div className="space-y-2.5 text-xs">
              {[["Budget", `$${r.budget}`], ["Deadline", r.deadline], ["Responses", r.responses], ["Status", r.status], ["Posted by", "Verified Customer"]].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium font-mono">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Btn variant="primary" full icon={ArrowRight}>Submit Proposal</Btn>
          <Btn variant="outline" full icon={Bookmark}>Bookmark Request</Btn>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-700">
            <div className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <p>Only verified reporters with a completed profile can submit proposals.</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Feeds Map ──────────────────────────────────────────────────────────
function FeedsMapScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"map" | "list">("map");
  return (
    <Page title="News Feeds" breadcrumbs={["Marketplace", "Feeds"]}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search feeds and sources..." value="" onChange={() => {}} /></div>
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["map", "list"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1 text-xs rounded font-medium capitalize transition-colors",
                view === v ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {v}
            </button>
          ))}
        </div>
      </div>
      {view === "map" ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
          <MapPlaceholder markers={FEED_MARKERS} height="h-[460px]" />
          <div className="space-y-2 overflow-y-auto max-h-[460px]">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">Live Feed Entries</div>
            {FEED_ENTRIES.map(e => (
              <div key={e.id} className="bg-card border border-border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-xs font-semibold text-foreground leading-snug">{e.title}</p>
                  {e.fresh && <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-medium text-muted-foreground">{e.source}</span>
                  <Chip color="gray">{e.category}</Chip>
                  <span className="text-[10px] text-muted-foreground">{e.published}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ name: "AP Wire", entries: 412, fresh: 8 }, { name: "Reuters", entries: 388, fresh: 5 }, { name: "Le Monde", entries: 204, fresh: 2 }, { name: "DW News", entries: 167, fresh: 3 }].map(s => (
              <div key={s.name} className="bg-card border border-border rounded-lg p-3 text-center hover:shadow-sm transition-shadow cursor-pointer">
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xl font-mono font-semibold text-foreground mt-1">{s.entries}</p>
                <p className="text-[10px] text-muted-foreground">entries · <span className="text-emerald-600 font-medium">{s.fresh} new</span></p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {FEED_ENTRIES.map(e => (
              <div key={e.id} className="flex items-start gap-4 p-4 hover:bg-muted/30">
                <div className={cn("w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0", e.fresh ? "bg-emerald-500" : "bg-muted-foreground/30")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{e.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs font-medium text-muted-foreground">{e.source}</span>
                    <Chip color="gray">{e.category}</Chip>
                    <span className="text-[11px] text-muted-foreground">{e.published}</span>
                  </div>
                </div>
                <button className="text-xs text-primary hover:underline flex-shrink-0">Read</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
}

// ── Shared Auth Mock Data ──────────────────────────────────────────────────────
const NOTIFICATIONS_DATA = [
  { id: "N-001", type: "delivery", title: "Delivery ready for download", body: "Your purchased reportage \"Alpine Summit Coverage\" is available.", time: "10 min ago", read: false, severity: "info" },
  { id: "N-002", type: "payment", title: "Payment received", body: "You received $420.00 for reportage REP-0031.", time: "2 hours ago", read: false, severity: "success" },
  { id: "N-003", type: "request", title: "New response to your request", body: "Klaus Weber submitted a proposal for REQ-0041.", time: "5 hours ago", read: false, severity: "info" },
  { id: "N-004", type: "system", title: "Account verification approved", body: "Your reporter account has been fully verified.", time: "Yesterday", read: true, severity: "success" },
  { id: "N-005", type: "warning", title: "Subscription expiring soon", body: "Your Professional plan expires in 7 days. Renew to avoid interruption.", time: "2 days ago", read: true, severity: "warning" },
  { id: "N-006", type: "dispute", title: "Dispute #DSP-009 resolved", body: "The dispute for order ORD-8701 has been resolved in your favor.", time: "3 days ago", read: true, severity: "success" },
  { id: "N-007", type: "system", title: "New platform policy update", body: "Please review the updated Terms of Service effective June 1, 2026.", time: "5 days ago", read: true, severity: "info" },
];

const BOOKMARKS_DATA = [
  { id: "BM-001", type: "reportage", title: "Westminster Protests — Full Coverage", reporter: "Sofia Brennan", price: 380, img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80", saved: "2026-05-20" },
  { id: "BM-002", type: "reportage", title: "Singapore Trade Summit 2026", reporter: "Hiroshi Tanaka", price: 520, img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=400&q=80", saved: "2026-05-18" },
  { id: "BM-003", type: "reporter", title: "Maya Chen", reporter: "New York · Finance", price: 650, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", saved: "2026-05-15" },
  { id: "BM-004", type: "request", title: "East Africa Drought — Ground Report", reporter: "REQ-0044 · Open", price: 700, img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&q=80", saved: "2026-05-12" },
  { id: "BM-005", type: "reportage", title: "Cairo Infrastructure Development", reporter: "Omar Khalil", price: 290, img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80", saved: "2026-05-08" },
];

const MY_CONTENT_DATA = [
  { id: "MC-001", title: "G7 Climate Emergency Coverage", type: "photo", status: "approved", size: "1.2 GB", files: 28, date: "2026-05-22", downloads: 14, revenue: 840 },
  { id: "MC-002", title: "Brussels EU Council Session", type: "video", status: "reviewing", size: "4.8 GB", files: 6, date: "2026-05-18", downloads: 0, revenue: 0 },
  { id: "MC-003", title: "Tokyo Smart City Documentary", type: "video", status: "approved", size: "3.1 GB", files: 4, date: "2026-05-10", downloads: 31, revenue: 2170 },
  { id: "MC-004", title: "Nairobi Drought Audio Series", type: "audio", status: "approved", size: "280 MB", files: 8, date: "2026-04-28", downloads: 22, revenue: 660 },
  { id: "MC-005", title: "Vienna Forum Photo Report", type: "photo", status: "rejected", size: "620 MB", files: 15, date: "2026-04-15", downloads: 0, revenue: 0 },
];

// ── SCREEN: Subscription Plans ─────────────────────────────────────────────────
function SubscriptionPlansScreen() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const plans = [
    { id: "free", name: "Free", price: { monthly: 0, annual: 0 }, desc: "For casual browsing and exploration", features: ["Browse marketplace", "5 bookmarks", "Basic search", "Public profiles"], cta: "Current Plan", current: true, highlight: false },
    { id: "pro", name: "Professional", price: { monthly: 29, annual: 22 }, desc: "For journalists and active buyers", features: ["Everything in Free", "Unlimited bookmarks", "Priority support", "Download history", "Advanced filters", "Early access to requests"], cta: "Upgrade", current: false, highlight: true },
    { id: "enterprise", name: "Enterprise", price: { monthly: 89, annual: 69 }, desc: "For newsrooms and media organizations", features: ["Everything in Professional", "Team seats (up to 10)", "Bulk licensing", "API access", "Dedicated account manager", "Custom invoicing"], cta: "Contact Sales", current: false, highlight: false },
  ];
  return (
    <Page title="Subscription Plans" breadcrumbs={["Account", "Subscription"]}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-1">Choose your plan</h2>
          <p className="text-sm text-muted-foreground">Upgrade to access more features. Cancel anytime.</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className={cn("text-sm font-medium", billing === "monthly" ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
            <button onClick={() => setBilling(b => b === "monthly" ? "annual" : "monthly")}
              className={cn("relative w-10 h-5 rounded-full transition-colors", billing === "annual" ? "bg-primary" : "bg-muted")}>
              <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform", billing === "annual" ? "translate-x-5" : "translate-x-0.5")} />
            </button>
            <span className={cn("text-sm font-medium", billing === "annual" ? "text-foreground" : "text-muted-foreground")}>
              Annual <span className="text-emerald-600 text-xs font-semibold">Save 25%</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(p => (
            <div key={p.id} className={cn("bg-card rounded-lg border p-6 flex flex-col relative", p.highlight ? "border-primary shadow-md" : "border-border")}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap">Most Popular</div>
              )}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground">{p.name}</h3>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-3xl font-semibold font-mono text-foreground">${p.price[billing]}</span>
                  {p.price[billing] > 0 && <span className="text-sm text-muted-foreground mb-0.5">/{billing === "monthly" ? "mo" : "mo billed annually"}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Btn variant={p.current ? "outline" : p.highlight ? "primary" : "outline"} full disabled={p.current}>
                {p.cta}
              </Btn>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-card border border-border rounded-lg p-5">
          <h4 className="text-sm font-semibold mb-3">Current Subscription</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {[["Plan", "Free"], ["Status", "Active"], ["Next renewal", "—"], ["Payment method", "—"]].map(([k, v]) => (
              <div key={k}>
                <p className="text-xs text-muted-foreground mb-0.5">{k}</p>
                <p className="font-medium text-foreground">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Registered Dashboard ───────────────────────────────────────────────
function RegisteredDashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <Page title="Dashboard" breadcrumbs={["Dashboard"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard label="Bookmarks" value="12" icon={Bookmark} sub="3 new" />
        <StatCard label="Purchases" value="8" icon={Package} sub="this month" />
        <StatCard label="Wallet" value="$240" icon={Wallet} trend="+$80" trendUp />
        <StatCard label="Notifications" value="3" icon={Bell} sub="unread" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: Download, label: "Downloaded", title: "Tokyo Smart City Documentary", time: "2 hours ago", color: "text-emerald-500" },
                { icon: Bookmark, label: "Bookmarked", title: "Westminster Protests Coverage", time: "Yesterday", color: "text-primary" },
                { icon: CreditCard, label: "Purchased", title: "Singapore Trade Summit 2026", time: "3 days ago", color: "text-emerald-500" },
                { icon: MessageSquare, label: "Submitted request", title: "REQ-0044 — Nairobi Drought", time: "5 days ago", color: "text-amber-500" },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn("w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0", a.color)}>
                    <a.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{a.label}</p>
                    <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Recommended Reportages</h3>
              <button onClick={() => onNavigate("reportages-map")} className="text-xs text-primary hover:underline">Browse all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {REPORTAGES.slice(0, 3).map(r => (
                <div key={r.id} className="rounded-md overflow-hidden border border-border cursor-pointer group"
                  onClick={() => onNavigate("reportage-detail")}>
                  <div className="h-24 overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-medium text-foreground line-clamp-2">{r.title}</p>
                    <p className="text-[10px] font-mono font-semibold text-foreground mt-0.5">${r.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <button onClick={() => onNavigate("notifications-list")} className="text-xs text-primary hover:underline">All</button>
            </div>
            <div className="space-y-2.5">
              {NOTIFICATIONS_DATA.filter(n => !n.read).map(n => (
                <div key={n.id} className="flex items-start gap-2.5">
                  <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                    n.severity === "success" ? "bg-emerald-500" : n.severity === "warning" ? "bg-amber-500" : "bg-primary")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground leading-snug">{n.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">Saved Bookmarks</h3>
              <button onClick={() => onNavigate("bookmarks")} className="text-xs text-primary hover:underline">All</button>
            </div>
            <div className="space-y-2">
              {BOOKMARKS_DATA.slice(0, 3).map(b => (
                <div key={b.id} className="flex items-center gap-2.5 text-xs">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{b.title}</p>
                    <p className="text-muted-foreground text-[11px]">{b.type} · {b.saved}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Btn variant="primary" full onClick={() => onNavigate("subscription-plans")} icon={Zap}>Upgrade Plan</Btn>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Bookmarks ──────────────────────────────────────────────────────────
function BookmarksScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState("all");
  const types = ["all", "reportage", "reporter", "request"];
  const filtered = useMemo(() => filter === "all" ? BOOKMARKS_DATA : BOOKMARKS_DATA.filter(b => b.type === filter), [filter]);
  return (
    <Page title="My Bookmarks" breadcrumbs={["Account", "Bookmarks"]}>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                filter === t ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {t}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground ml-auto">{filtered.length} saved</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => onNavigate(b.type === "reportage" ? "reportage-detail" : b.type === "reporter" ? "reporter-profile" : "request-detail")}>
            <div className="h-36 overflow-hidden relative">
              <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2">
                <Chip color={b.type === "reportage" ? "blue" : b.type === "reporter" ? "sky" : "amber"}>{b.type}</Chip>
              </div>
              <button className="absolute top-2 left-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow">
                <Bookmark className="w-3.5 h-3.5 text-primary fill-primary" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{b.reporter}</p>
              <div className="flex items-center justify-between mt-2">
                {b.type !== "reporter" && <span className="text-sm font-mono font-semibold text-foreground">${b.price}</span>}
                <span className="text-[11px] text-muted-foreground ml-auto">Saved {b.saved}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Bookmark className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">No {filter === "all" ? "" : filter} bookmarks yet</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">Browse the marketplace and click the bookmark icon to save items here.</p>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Notifications List ─────────────────────────────────────────────────
function NotificationsListScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const shown = filter === "unread" ? NOTIFICATIONS_DATA.filter(n => !n.read) : NOTIFICATIONS_DATA;
  const severityIcon = (s: string) => {
    if (s === "success") return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (s === "warning") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <Info className="w-4 h-4 text-primary" />;
  };
  return (
    <Page title="Notifications" breadcrumbs={["Account", "Notifications"]}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["all", "unread"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                filter === f ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f} {f === "unread" && <span className="ml-1 bg-primary text-primary-foreground text-[10px] rounded-full px-1.5 py-0.5 font-semibold">
                {NOTIFICATIONS_DATA.filter(n => !n.read).length}
              </span>}
            </button>
          ))}
        </div>
        <button className="text-xs text-primary hover:underline">Mark all as read</button>
      </div>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {shown.map(n => (
          <button key={n.id} onClick={() => onNavigate("notification-detail")}
            className={cn("w-full flex items-start gap-3 p-4 text-left hover:bg-muted/30 transition-colors", !n.read && "bg-primary/[0.03]")}>
            <div className="flex-shrink-0 mt-0.5">{severityIcon(n.severity)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={cn("text-sm leading-snug", !n.read ? "font-semibold text-foreground" : "font-medium text-foreground")}>{n.title}</p>
                <span className="text-[11px] text-muted-foreground flex-shrink-0">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
            </div>
            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />}
          </button>
        ))}
        {shown.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium">No unread notifications</p>
            <p className="text-xs text-muted-foreground mt-1">You are all caught up.</p>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Notification Detail ────────────────────────────────────────────────
function NotificationDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const n = NOTIFICATIONS_DATA[0];
  const severityColor = { info: "bg-blue-50 border-blue-200 text-blue-700", success: "bg-emerald-50 border-emerald-200 text-emerald-700", warning: "bg-amber-50 border-amber-200 text-amber-700" } as Record<string, string>;
  return (
    <Page title="Notification" breadcrumbs={["Account", "Notifications", n.id]}>
      <div className="max-w-2xl">
        <div className={cn("border rounded-lg p-4 mb-5 flex items-start gap-3 text-sm", severityColor[n.severity])}>
          {n.severity === "success" ? <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> : n.severity === "warning" ? <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" /> : <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />}
          <div>
            <p className="font-semibold">{n.title}</p>
            <p className="text-xs mt-0.5 opacity-80">{n.time}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5 mb-4">
          <h4 className="text-sm font-semibold mb-2">Details</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{n.body}</p>
          <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-3 text-xs">
            {[["Type", n.type], ["Severity", n.severity], ["Status", "Unread"], ["Received", n.time]].map(([k, v]) => (
              <div key={k}><p className="text-muted-foreground">{k}</p><p className="font-medium mt-0.5 capitalize">{v}</p></div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <Btn variant="primary" onClick={() => onNavigate("delivery-detail")}>View Related Item</Btn>
          <Btn variant="outline" onClick={() => onNavigate("notifications-list")}>Back to Notifications</Btn>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Notification Preferences ──────────────────────────────────────────
function NotificationPreferencesScreen() {
  const [prefs, setPrefs] = useState<Record<string, Record<string, boolean>>>({
    deliveries: { email: true, push: true, sms: false },
    payments: { email: true, push: true, sms: true },
    requests: { email: true, push: false, sms: false },
    disputes: { email: true, push: true, sms: false },
    system: { email: false, push: false, sms: false },
    marketing: { email: false, push: false, sms: false },
  });
  const labels: Record<string, string> = { deliveries: "Delivery updates", payments: "Payment received", requests: "New request responses", disputes: "Dispute updates", system: "System announcements", marketing: "Platform news & promotions" };
  const toggle = (cat: string, ch: string) => setPrefs(p => ({ ...p, [cat]: { ...p[cat], [ch]: !p[cat][ch] } }));
  return (
    <Page title="Notification Preferences" breadcrumbs={["Account", "Notifications", "Preferences"]}>
      <div className="max-w-2xl">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-[1fr_repeat(3,_64px)] border-b border-border">
            <div className="p-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Category</div>
            {["Email", "Push", "SMS"].map(c => (
              <div key={c} className="p-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide text-center">{c}</div>
            ))}
          </div>
          {Object.entries(prefs).map(([cat, channels]) => (
            <div key={cat} className="grid grid-cols-[1fr_repeat(3,_64px)] border-b last:border-0 border-border hover:bg-muted/20">
              <div className="p-3">
                <p className="text-sm font-medium text-foreground">{labels[cat]}</p>
                <p className="text-xs text-muted-foreground mt-0.5 capitalize">{cat}</p>
              </div>
              {["email", "push", "sms"].map(ch => (
                <div key={ch} className="flex items-center justify-center p-3">
                  <button onClick={() => toggle(cat, ch)}
                    className={cn("relative w-9 h-5 rounded-full transition-colors flex-shrink-0",
                      channels[ch] ? "bg-primary" : "bg-muted")}>
                    <span className={cn("absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform",
                      channels[ch] ? "translate-x-4" : "translate-x-0.5")} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <Btn variant="primary">Save Preferences</Btn>
          <Btn variant="outline">Reset to Defaults</Btn>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: User Profile ───────────────────────────────────────────────────────
function UserProfileScreen() {
  const [tab, setTab] = useState<"profile" | "security" | "devices">("profile");
  return (
    <Page title="My Profile" breadcrumbs={["Account", "Profile"]}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-semibold flex items-center justify-center mx-auto mb-3">EM</div>
            <p className="font-semibold text-sm text-foreground">Elena Marchetti</p>
            <p className="text-xs text-muted-foreground mt-0.5">Reporter · Italy</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Verified
            </div>
            <Btn variant="outline" size="sm" full className="mt-3">Change Avatar</Btn>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {(["profile", "security", "devices"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("w-full text-left px-4 py-3 text-sm font-medium capitalize border-b last:border-0 border-border transition-colors",
                  tab === t ? "bg-primary/5 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                {t === "profile" ? "Profile Info" : t === "security" ? "Security" : "Devices & Sessions"}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          {tab === "profile" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Profile Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["First name", "Elena"], ["Last name", "Marchetti"], ["Email", "e.marchetti@medialab.it"], ["Phone", "+39 02 1234 5678"], ["Country", "Italy"], ["City", "Milan"]].map(([l, v]) => (
                  <div key={l}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">{l}</label>
                    <input defaultValue={v} className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio</label>
                <textarea rows={3} defaultValue="Award-winning financial journalist with 12 years of experience covering conflict zones and political transitions." className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <Btn variant="primary">Save Changes</Btn>
                <Btn variant="outline">Cancel</Btn>
              </div>
            </div>
          )}
          {tab === "security" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Security Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Current password</label>
                  <input type="password" placeholder="••••••••" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">New password</label>
                  <input type="password" placeholder="Min. 8 characters" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Confirm new password</label>
                  <input type="password" placeholder="Repeat new password" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <Btn variant="primary">Update Password</Btn>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account</p>
                  </div>
                  <Btn variant="outline" size="sm">Enable 2FA</Btn>
                </div>
              </div>
            </div>
          )}
          {tab === "devices" && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Active Sessions</h3>
              {[
                { device: "MacBook Pro — Chrome 124", location: "Milan, Italy", last: "Now · Current session", current: true },
                { device: "iPhone 16 — Safari", location: "Milan, Italy", last: "2 hours ago", current: false },
                { device: "Windows PC — Firefox 125", location: "Rome, Italy", last: "3 days ago", current: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-md">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.device}</p>
                      <p className="text-xs text-muted-foreground">{s.location} · {s.last}</p>
                    </div>
                  </div>
                  {s.current ? <Chip color="green">Current</Chip> : <Btn variant="ghost" size="xs">Revoke</Btn>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: My Content List ────────────────────────────────────────────────────
function MyContentListScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"date" | "revenue">("date");
  const filtered = useMemo(() => MY_CONTENT_DATA
    .filter(c => c.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === "revenue" ? b.revenue - a.revenue : b.date.localeCompare(a.date)),
    [q, sort]);
  const typeColor: Record<string, "blue" | "sky" | "gray"> = { photo: "blue", video: "sky", audio: "gray" };
  return (
    <Page title="My Content" breadcrumbs={["Account", "My Content"]}>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search content..." value={q} onChange={setQ} /></div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted-foreground">Sort:</span>
          {(["date", "revenue"] as const).map(s => (
            <button key={s} onClick={() => setSort(s)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize border transition-colors",
                sort === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground")}>
              {s === "date" ? "Latest" : "Revenue"}
            </button>
          ))}
        </div>
        <Btn variant="primary" size="sm" icon={Plus}>Upload Content</Btn>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Items" value={String(MY_CONTENT_DATA.length)} icon={Package} sub="" />
        <StatCard label="Approved" value={String(MY_CONTENT_DATA.filter(c => c.status === "approved").length)} icon={CheckCircle} sub="" />
        <StatCard label="Total Downloads" value={String(MY_CONTENT_DATA.reduce((s, c) => s + c.downloads, 0))} icon={Download} sub="" />
        <StatCard label="Revenue" value={`$${MY_CONTENT_DATA.reduce((s, c) => s + c.revenue, 0).toLocaleString()}`} icon={DollarSign} trend="+12%" trendUp />
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
          <thead><tr>
            <TH sortable active={sort === "date"} onClick={() => setSort("date")}>Content</TH>
            <TH>Type</TH><TH>Status</TH><TH>Size</TH><TH>Files</TH>
            <TH sortable active={sort === "revenue"} onClick={() => setSort("revenue")}>Revenue</TH>
            <TH>Downloads</TH><TH></TH>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-muted/30">
                <TD>
                  <div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">{c.id} · {c.date}</p>
                  </div>
                </TD>
                <TD><Chip color={typeColor[c.type]}>{c.type}</Chip></TD>
                <TD><StatusBadge status={c.status} /></TD>
                <TD mono>{c.size}</TD>
                <TD mono>{c.files}</TD>
                <TD mono>{c.revenue > 0 ? `$${c.revenue.toLocaleString()}` : "—"}</TD>
                <TD mono>{c.downloads > 0 ? c.downloads : "—"}</TD>
                <TD>
                  <button onClick={() => onNavigate("my-content-detail")} className="text-xs text-primary hover:underline">View</button>
                </TD>
              </tr>
            ))}
          </tbody>
        </table></div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <Inbox className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium">No content found</p>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: My Content Detail ──────────────────────────────────────────────────
function MyContentDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const c = MY_CONTENT_DATA[0];
  return (
    <Page title={c.title} breadcrumbs={["Account", "My Content", c.id]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Chip color="blue">{c.type}</Chip>
              <StatusBadge status={c.status} />
              <span className="text-xs font-mono text-muted-foreground">{c.id}</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">{c.title}</h2>
            <p className="text-xs text-muted-foreground">Uploaded {c.date} · {c.size} · {c.files} files</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h4 className="text-sm font-semibold mb-3">File Integrity</h4>
            <div className="space-y-2.5">
              {[
                { label: "AV Scan", status: "clean", ok: true },
                { label: "Hash verification", status: "verified", ok: true },
                { label: "GPS metadata", status: "present", ok: true },
                { label: "Checksum", status: "valid", ok: true },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className={cn("flex items-center gap-1.5 font-medium text-xs", f.ok ? "text-emerald-600" : "text-red-500")}>
                    {f.ok ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h4 className="text-sm font-semibold mb-3">Download History</h4>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
                <thead><tr><TH>Buyer</TH><TH>Date</TH><TH>Revenue</TH><TH>Order</TH></tr></thead>
                <tbody>
                  {[
                    { buyer: "Priya Nambiar", date: "2026-05-22", rev: 60, order: "ORD-9201" },
                    { buyer: "Takeshi Morita", date: "2026-05-19", rev: 60, order: "ORD-9145" },
                    { buyer: "Anon Buyer", date: "2026-05-15", rev: 60, order: "ORD-9088" },
                  ].map(d => (
                    <tr key={d.order} className="hover:bg-muted/30">
                      <TD>{d.buyer}</TD>
                      <TD>{d.date}</TD>
                      <TD mono>${d.rev}</TD>
                      <TD mono>{d.order}</TD>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Performance</h4>
            <div className="space-y-3">
              {[{ l: "Total downloads", v: c.downloads }, { l: "Total revenue", v: `$${c.revenue.toLocaleString()}` }, { l: "Avg per download", v: `$${c.downloads > 0 ? Math.round(c.revenue / c.downloads) : 0}` }].map(s => (
                <div key={s.l} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{s.l}</span>
                  <span className="font-mono font-semibold">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold mb-2">Actions</h4>
            <Btn variant="outline" size="sm" full icon={Edit}>Edit Metadata</Btn>
            <Btn variant="outline" size="sm" full icon={Download}>Download Original</Btn>
            <Btn variant="destructive" size="sm" full icon={Trash2}>Unpublish Content</Btn>
          </div>
          <button onClick={() => onNavigate("my-content-list")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Back to content list
          </button>
        </div>
      </div>
    </Page>
  );
}

// ── Reporter Mock Data ─────────────────────────────────────────────────────────
const REQUEST_RESPONSES_DATA = [
  { id: "RR-001", requestId: "REQ-0041", title: "EU Council Emergency Session — Brussels", budget: 850, myBid: 780, status: "pending", submitted: "2026-05-20", responses: 3, deadline: "2026-06-05" },
  { id: "RR-002", requestId: "REQ-0038", title: "Vienna Tech Forum Keynote Coverage", budget: 600, myBid: 600, status: "accepted", submitted: "2026-05-12", responses: 2, deadline: "2026-05-28" },
  { id: "RR-003", requestId: "REQ-0033", title: "Oslo Arctic Climate Report", budget: 720, myBid: 650, status: "rejected", submitted: "2026-05-05", responses: 7, deadline: "2026-05-22" },
  { id: "RR-004", requestId: "REQ-0029", title: "Berlin Startup Ecosystem 2026", budget: 500, myBid: 480, status: "completed", submitted: "2026-04-18", responses: 4, deadline: "2026-05-02" },
  { id: "RR-005", requestId: "REQ-0045", title: "Beijing Green Energy Forum", budget: 950, myBid: 900, status: "pending", submitted: "2026-05-22", responses: 4, deadline: "2026-07-01" },
];

const REPORTER_EARNINGS_DETAIL = [
  { id: "REP-0031", title: "Alpine Summit Coverage", buyer: "Reuters Agency", amount: 420, fee: 63, net: 357, date: "2026-05-18", status: "paid" },
  { id: "REP-0028", title: "Vienna Forum Report", buyer: "Priya Nambiar", amount: 380, fee: 57, net: 323, date: "2026-05-10", status: "paid" },
  { id: "REP-0025", title: "Berlin Startup Documentary", buyer: "TechMedia GmbH", amount: 650, fee: 97.5, net: 552.5, date: "2026-04-30", status: "paid" },
  { id: "REP-0022", title: "Oslo Arctic Investigation", buyer: "Nordic Press", amount: 540, fee: 81, net: 459, date: "2026-04-20", status: "paid" },
  { id: "REP-0019", title: "Brussels Protest Series", buyer: "EuroDesk", amount: 290, fee: 43.5, net: 246.5, date: "2026-04-10", status: "pending" },
];

const REPORTER_MONTHLY = [
  { month: "Jan", gross: 1240, net: 1054 }, { month: "Feb", gross: 1820, net: 1547 },
  { month: "Mar", gross: 980, net: 833 }, { month: "Apr", gross: 2340, net: 1989 },
  { month: "May", gross: 2280, net: 1938 },
];

const DEVICES_DATA = [
  { id: "DEV-001", name: "Canon EOS R5", type: "Camera", serial: "CE-R5-20249821", added: "2025-09-01", verified: true, lastUsed: "2026-05-18", uploads: 312 },
  { id: "DEV-002", name: "Sony FX3 Cinema", type: "Video Camera", serial: "SFX3-8812344", added: "2025-10-14", verified: true, lastUsed: "2026-05-10", uploads: 88 },
  { id: "DEV-003", name: "Zoom H6 Recorder", type: "Audio Recorder", serial: "ZH6-3041928", added: "2026-01-22", verified: true, lastUsed: "2026-04-28", uploads: 54 },
  { id: "DEV-004", name: "DJI Air 3", type: "Drone", serial: "DJI-A3-77812", added: "2026-03-05", verified: false, lastUsed: "2026-05-05", uploads: 21 },
];

// ── SCREEN: Reporter Request Responses ─────────────────────────────────────────
function ReporterRequestResponsesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const statuses = ["all", "pending", "accepted", "rejected", "completed"];
  const filtered = useMemo(() =>
    statusFilter === "all" ? REQUEST_RESPONSES_DATA : REQUEST_RESPONSES_DATA.filter(r => r.status === statusFilter),
    [statusFilter]);
  return (
    <Page title="Request Responses" breadcrumbs={["Reporter", "Requests", "My Responses"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard label="Submitted" value={String(REQUEST_RESPONSES_DATA.length)} icon={MessageSquare} sub="total responses" />
        <StatCard label="Pending" value={String(REQUEST_RESPONSES_DATA.filter(r => r.status === "pending").length)} icon={Clock} sub="awaiting decision" />
        <StatCard label="Accepted" value={String(REQUEST_RESPONSES_DATA.filter(r => r.status === "accepted").length)} icon={CheckCircle} sub="this month" />
        <StatCard label="Win Rate" value="40%" icon={TrendingUp} trend="+8%" trendUp />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex gap-1 p-1 bg-muted rounded-md flex-wrap">
          {statuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                statusFilter === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => onNavigate("requests-map")} className="ml-auto text-xs text-primary font-medium hover:underline flex items-center gap-1">
          Browse open requests <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
          <thead><tr>
            <TH>Request</TH><TH>My Bid</TH><TH>Budget</TH>
            <TH>Deadline</TH><TH>Submitted</TH><TH>Status</TH><TH></TH>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="hover:bg-muted/30">
                <TD>
                  <div>
                    <p className="font-medium text-sm max-w-[280px] truncate">{r.title}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">{r.requestId}</p>
                  </div>
                </TD>
                <TD mono>${r.myBid}</TD>
                <TD mono>${r.budget}</TD>
                <TD>{r.deadline}</TD>
                <TD>{r.submitted}</TD>
                <TD><StatusBadge status={r.status} /></TD>
                <TD>
                  <button onClick={() => onNavigate("request-detail")} className="text-xs text-primary hover:underline">View</button>
                </TD>
              </tr>
            ))}
          </tbody>
        </table></div>
        {filtered.length === 0 && (
          <div className="p-10 text-center">
            <MessageSquare className="w-7 h-7 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium">No responses with this status</p>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Earnings ──────────────────────────────────────────────────
function ReporterEarningsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const totalGross = REPORTER_EARNINGS_DETAIL.reduce((s, e) => s + e.amount, 0);
  const totalNet   = REPORTER_EARNINGS_DETAIL.reduce((s, e) => s + e.net, 0);
  const totalFees  = REPORTER_EARNINGS_DETAIL.reduce((s, e) => s + e.fee, 0);
  return (
    <Page title="Earnings" breadcrumbs={["Reporter", "Earnings"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard label="Gross (May)" value={`$${REPORTER_MONTHLY[4].gross.toLocaleString()}`} icon={DollarSign} trend="+22%" trendUp />
        <StatCard label="Net (May)"   value={`$${REPORTER_MONTHLY[4].net.toLocaleString()}`}   icon={TrendingUp} sub="after 15% fee" />
        <StatCard label="Platform Fee" value={`$${totalFees.toFixed(0)}`} icon={CreditCard} sub="15% of gross" />
        <StatCard label="Pending"     value="$246" icon={Clock} sub="processing" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-5">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart id="ch-reporter-monthly" data={REPORTER_MONTHLY} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <Tooltip formatter={(v: number) => [`$${v}`, ""]} contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border)" }} />
              <Bar key="gross" dataKey="gross" name="Gross" fill="var(--muted)" radius={[3, 3, 0, 0]} />
              <Bar key="net" dataKey="net" name="Net" fill="var(--primary)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-end">
            {[{ color: "bg-muted border border-border", label: "Gross" }, { color: "bg-primary", label: "Net" }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={cn("w-3 h-3 rounded-sm", l.color)} />{l.label}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Summary</h4>
            <div className="space-y-2.5 text-sm">
              {[["Total gross", `$${totalGross.toLocaleString()}`], ["Platform fee (15%)", `-$${totalFees.toFixed(2)}`], ["Net earnings", `$${totalNet.toFixed(2)}`], ["Paid out", "$1,938.00"], ["Pending", "$246.50"]].map(([k, v]) => (
                <div key={k} className={cn("flex justify-between", k === "Net earnings" ? "font-semibold text-foreground pt-2 border-t border-border" : "text-muted-foreground")}>
                  <span>{k}</span>
                  <span className={cn("font-mono", k === "Platform fee (15%)" && "text-red-500")}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Btn variant="primary" full icon={Download} onClick={() => onNavigate("wallet")}>Request Withdrawal</Btn>
          <Btn variant="outline" full icon={FileText}>Export CSV</Btn>
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Transaction History</h3>
          <span className="text-xs text-muted-foreground">{REPORTER_EARNINGS_DETAIL.length} transactions</span>
        </div>
        <div className="overflow-x-auto"><table className="w-full min-w-[560px]">
          <thead><tr>
            <TH>Reportage</TH><TH>Buyer</TH><TH>Gross</TH>
            <TH>Fee</TH><TH>Net</TH><TH>Date</TH><TH>Status</TH>
          </tr></thead>
          <tbody>
            {REPORTER_EARNINGS_DETAIL.map(e => (
              <tr key={e.id} className="hover:bg-muted/30">
                <TD>
                  <div>
                    <p className="font-medium text-sm max-w-[220px] truncate">{e.title}</p>
                    <p className="text-[11px] font-mono text-muted-foreground">{e.id}</p>
                  </div>
                </TD>
                <TD>{e.buyer}</TD>
                <TD mono>${e.amount}</TD>
                <TD mono className="text-red-500">-${e.fee}</TD>
                <TD mono>${e.net}</TD>
                <TD>{e.date}</TD>
                <TD><StatusBadge status={e.status} /></TD>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Devices ───────────────────────────────────────────────────
function ReporterDevicesScreen() {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <Page title="My Devices" breadcrumbs={["Reporter", "Account", "Devices"]}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{DEVICES_DATA.length} registered devices</p>
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => setShowAdd(s => !s)}>Register Device</Btn>
      </div>
      {showAdd && (
        <div className="bg-card border border-primary/30 rounded-lg p-5 mb-5">
          <h4 className="text-sm font-semibold mb-4">Register New Device</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {[["Device name", "e.g. Canon EOS R5"], ["Serial number", "e.g. CE-R5-20249821"]].map(([l, p]) => (
              <div key={l}>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{l}</label>
                <input placeholder={p} className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Device type</label>
              <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                {["Camera", "Video Camera", "Audio Recorder", "Drone", "Smartphone", "Other"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Purchase date</label>
              <input type="date" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="primary" size="sm">Submit for Verification</Btn>
            <Btn variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Btn>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {DEVICES_DATA.map(d => (
          <div key={d.id} className="bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-foreground">{d.name}</p>
                {d.verified
                  ? <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium"><CheckCircle className="w-3 h-3" />Verified</span>
                  : <span className="flex items-center gap-1 text-[11px] text-amber-600 font-medium"><Clock className="w-3 h-3" />Pending verification</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {d.type} · Serial: <span className="font-mono">{d.serial}</span>
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center sm:text-right">
              {[{ l: "Added", v: d.added }, { l: "Last used", v: d.lastUsed }, { l: "Uploads", v: String(d.uploads) }].map(s => (
                <div key={s.l}>
                  <p className="text-[10px] text-muted-foreground">{s.l}</p>
                  <p className="text-xs font-mono font-medium text-foreground">{s.v}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Btn variant="outline" size="xs">Edit</Btn>
              <Btn variant="ghost" size="xs" icon={Trash2}><span className="sr-only">Remove</span></Btn>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-700">
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <p>Device verification takes up to 48 hours. Content uploaded from unverified devices will be marked pending until verification is complete.</p>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Profile (Edit) ───────────────────────────────────────────
function ReporterProfileEditScreen() {
  const [tab, setTab] = useState<"info" | "public" | "rates">("info");
  return (
    <Page title="My Reporter Profile" breadcrumbs={["Reporter", "Account", "Profile"]}>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-semibold flex items-center justify-center mx-auto mb-3">EM</div>
            <p className="font-semibold text-sm">Elena Marchetti</p>
            <p className="text-xs text-muted-foreground mt-0.5">Reporter · Italy</p>
            <div className="flex items-center justify-center gap-1 mt-2 text-xs text-emerald-600 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Verified
            </div>
            <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
              {[{ v: "47", l: "Works" }, { v: "4.9", l: "Rating" }, { v: "$380", l: "Avg rate" }].map(s => (
                <div key={s.l}><p className="text-sm font-semibold font-mono">{s.v}</p><p className="text-[10px] text-muted-foreground">{s.l}</p></div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {(["info", "public", "rates"] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={cn("w-full text-left px-4 py-3 text-sm font-medium border-b last:border-0 border-border transition-colors",
                  tab === t ? "bg-primary/5 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/30")}>
                {t === "info" ? "Personal Info" : t === "public" ? "Public Profile" : "Rates & Availability"}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          {tab === "info" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["First name", "Elena"], ["Last name", "Marchetti"], ["Email", "e.marchetti@medialab.it"], ["Phone", "+39 02 1234 5678"], ["Country", "Italy"], ["City", "Milan"]].map(([l, v]) => (
                  <div key={l}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">{l}</label>
                    <input defaultValue={v} className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2"><Btn variant="primary">Save</Btn><Btn variant="outline">Cancel</Btn></div>
            </div>
          )}
          {tab === "public" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Public Profile Settings</h3>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Specializations (select up to 3)</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Politics", "Conflict & War", "Technology", "Environment", "Business", "Culture", "Sports", "Humanitarian"].map(s => (
                    <button key={s} className={cn("px-3 py-1.5 text-xs rounded-full border font-medium transition-colors",
                      ["Politics", "Conflict & War", "Technology"].includes(s)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary hover:text-foreground")}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Bio (public-facing)</label>
                <textarea rows={4} defaultValue="Award-winning journalist based in Milan with 10+ years covering European politics and conflict zones. Previously at La Repubblica and Reuters." className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Languages</label>
                <input defaultValue="Italian, English, French" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
              </div>
              <div className="flex gap-3 pt-2"><Btn variant="primary">Save</Btn><Btn variant="outline">Preview Public Profile</Btn></div>
            </div>
          )}
          {tab === "rates" && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Rates & Availability</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[["Base day rate ($)", "420"], ["Photo package rate ($)", "280"], ["Video package rate ($)", "650"], ["Audio package rate ($)", "180"]].map(([l, v]) => (
                  <div key={l}>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">{l}</label>
                    <input defaultValue={v} type="number" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary font-mono" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Availability</label>
                <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                  <option>Available — accepting assignments</option>
                  <option>Busy — limited availability</option>
                  <option>Unavailable — not taking work</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Travel radius</label>
                <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                  <option>Europe only</option>
                  <option>Europe + Middle East</option>
                  <option>Worldwide (except conflict zones)</option>
                  <option>Worldwide (incl. conflict zones)</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2"><Btn variant="primary">Save Rates</Btn><Btn variant="outline">Cancel</Btn></div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Portfolio Photo ──────────────────────────────────────────
function ReporterPortfolioPhotoScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [selected, setSelected] = useState<string[]>([]);
  const items = REPORTAGES.slice(0, 9);
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  return (
    <Page title="Photo Portfolio" breadcrumbs={["Reporter", "Portfolio", "Photo"]}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-0.5 bg-muted rounded">
            {(["photo", "video", "audio"] as const).map(f => (
              <button key={f} onClick={() => onNavigate(f === "photo" ? "reporter-portfolio-photo" : f === "video" ? "reporter-portfolio-video" : "reporter-portfolio-audio")}
                className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                  f === "photo" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {f}
              </button>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{items.length} items</span>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Btn variant="destructive" size="sm" icon={Trash2}>{selected.length} selected</Btn>
          )}
          <Btn variant="primary" size="sm" icon={Plus} onClick={() => onNavigate("create-reportage")}>Upload Photos</Btn>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {items.map(r => (
          <div key={r.id}
            className={cn("rounded-lg overflow-hidden border cursor-pointer group transition-all", selected.includes(r.id) ? "border-primary ring-2 ring-primary/30" : "border-border hover:shadow-md")}>
            <div className="relative h-32 overflow-hidden" onClick={() => toggle(r.id)}>
              <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className={cn("absolute inset-0 transition-colors", selected.includes(r.id) ? "bg-primary/20" : "bg-foreground/0 group-hover:bg-foreground/10")} />
              {selected.includes(r.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="absolute bottom-2 left-2"><StatusBadge status={r.status} /></div>
            </div>
            <div className="p-2">
              <p className="text-[11px] font-medium text-foreground line-clamp-2 leading-snug">{r.title}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">{r.date}</span>
                <span className="text-[10px] font-mono font-semibold">${r.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination current={1} total={3} onChange={() => {}} />
    </Page>
  );
}

// ── SCREEN: Reporter Portfolio Video ──────────────────────────────────────────
function ReporterPortfolioVideoScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const items = REPORTAGES.slice(0, 6);
  return (
    <Page title="Video Portfolio" breadcrumbs={["Reporter", "Portfolio", "Video"]}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-0.5 bg-muted rounded">
          {(["photo", "video", "audio"] as const).map(f => (
            <button key={f} onClick={() => onNavigate(f === "photo" ? "reporter-portfolio-photo" : f === "video" ? "reporter-portfolio-video" : "reporter-portfolio-audio")}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                f === "video" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f}
            </button>
          ))}
        </div>
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => onNavigate("create-reportage")}>Upload Video</Btn>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(r => (
          <div key={r.id} className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-md transition-shadow cursor-pointer">
            <div className="relative h-44 overflow-hidden bg-muted">
              <img src={r.img} alt={r.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-foreground border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-foreground/70 text-background text-[10px] px-1.5 py-0.5 rounded font-mono">4:32</div>
              <div className="absolute top-2 left-2"><StatusBadge status={r.status} /></div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">{r.title}</p>
              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">{r.date}</span>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-muted-foreground"><Download className="w-3 h-3" />8</span>
                  <span className="font-mono font-semibold">${r.price}</span>
                </div>
              </div>
            </div>
            <div className="px-3 pb-3 flex gap-2">
              <Btn variant="outline" size="xs" full>Edit</Btn>
              <Btn variant="ghost" size="xs" icon={Trash2}><span className="sr-only">Delete</span></Btn>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

// ── SCREEN: Reporter Portfolio Audio ──────────────────────────────────────────
function ReporterPortfolioAudioScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const tracks = [
    { id: "AU-001", title: "Interview: UN Special Envoy on Climate", duration: "18:42", date: "2026-04-10", plays: 1240, downloads: 14, price: 120, status: "approved" },
    { id: "AU-002", title: "Field Recording: Lagos Port Strike Day 3", duration: "34:15", date: "2026-03-28", plays: 890, downloads: 9, price: 80, status: "approved" },
    { id: "AU-003", title: "Roundtable: Digital Press Freedom 2026", duration: "51:07", date: "2026-03-12", plays: 2100, downloads: 31, price: 150, status: "approved" },
    { id: "AU-004", title: "Protest Audio Series — Part 1", duration: "22:44", date: "2026-02-18", plays: 430, downloads: 5, price: 90, status: "reviewing" },
  ];
  return (
    <Page title="Audio Portfolio" breadcrumbs={["Reporter", "Portfolio", "Audio"]}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-0.5 bg-muted rounded">
          {(["photo", "video", "audio"] as const).map(f => (
            <button key={f} onClick={() => onNavigate(f === "photo" ? "reporter-portfolio-photo" : f === "video" ? "reporter-portfolio-video" : "reporter-portfolio-audio")}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                f === "audio" ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {f}
            </button>
          ))}
        </div>
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => onNavigate("create-reportage")}>Upload Audio</Btn>
      </div>
      <div className="bg-card border border-border rounded-lg divide-y divide-border">
        {tracks.map(t => (
          <div key={t.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/30 group">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-primary/20">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[11px] border-l-primary border-b-[6px] border-b-transparent ml-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{t.title}</p>
              <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                <span>{t.date}</span>
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{t.plays.toLocaleString()} plays</span>
                <span className="flex items-center gap-1"><Download className="w-3 h-3" />{t.downloads}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs">
              <span className="font-mono text-muted-foreground">{t.duration}</span>
              <StatusBadge status={t.status} />
              <span className="font-mono font-semibold">${t.price}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Btn variant="outline" size="xs">Edit</Btn>
              <Btn variant="ghost" size="xs" icon={Trash2}><span className="sr-only">Delete</span></Btn>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
        {[{ l: "Total plays", v: "4,660" }, { l: "Total downloads", v: "59" }, { l: "Revenue", v: "$660" }].map(s => (
          <div key={s.l} className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xl font-semibold font-mono text-foreground">{s.v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}

// ── SCREEN: Create Reportage ───────────────────────────────────────────────────
function CreateReportageScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<"photo" | "video" | "audio">("photo");
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string; progress: number }[]>([
    { name: "main_coverage_4k.mp4", size: "2.1 GB", progress: 100 },
    { name: "photos_bundle.zip", size: "840 MB", progress: 78 },
  ]);
  return (
    <Page title="Create Reportage" breadcrumbs={["Reporter", "My Reportages", "New"]}>
      <div className="max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center gap-0 mb-8">
          {[{ n: 1, l: "Content Info" }, { n: 2, l: "Upload Files" }, { n: 3, l: "Pricing & Submit" }].map((s, i) => (
            <div key={s.n} className="flex items-center flex-1">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  step > s.n ? "bg-emerald-500 text-white" : step === s.n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  {step > s.n ? <CheckCircle className="w-4 h-4" /> : s.n}
                </div>
                <span className={cn("text-xs font-medium hidden sm:block", step === s.n ? "text-foreground" : "text-muted-foreground")}>{s.l}</span>
              </div>
              {i < 2 && <div className={cn("flex-1 h-px mx-3", step > s.n ? "bg-emerald-500" : "bg-border")} />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Content Information</h3>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Content type</label>
                <div className="flex gap-2">
                  {(["photo", "video", "audio"] as const).map(t => (
                    <button key={t} onClick={() => setType(t)}
                      className={cn("flex-1 py-2.5 text-sm rounded-md border font-medium capitalize transition-colors",
                        type === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title</label>
                <input placeholder="Descriptive title for your reportage" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
                  <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                    {["Politics", "Conflict & War", "Technology", "Environment", "Business", "Culture"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Country / Location</label>
                  <input placeholder="e.g. Belgium, Brussels" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Coverage date</label>
                  <input type="date" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Device used</label>
                  <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                    {DEVICES_DATA.map(d => <option key={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
                <textarea rows={4} placeholder="Describe the content, context, and what is included in this reportage..." className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring resize-none" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Btn variant="outline" onClick={() => onNavigate("reporter-reportages")}>Cancel</Btn>
                <Btn variant="primary" onClick={() => setStep(2)}>Next: Upload Files</Btn>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Upload Files</h3>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); setFiles(f => [...f, { name: "new_file.zip", size: "—", progress: 0 }]); }}
                className={cn("border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer",
                  dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30")}>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">Drag files here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Max 10 GB per file · MP4, MOV, ZIP, RAW, MP3, WAV supported</p>
              </div>
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                      <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-medium text-foreground truncate">{f.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{f.size}</span>
                        </div>
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full transition-all", f.progress === 100 ? "bg-emerald-500" : "bg-primary")} style={{ width: `${f.progress}%` }} />
                        </div>
                      </div>
                      <span className="text-[11px] font-medium flex-shrink-0">{f.progress === 100 ? <span className="text-emerald-600">Done</span> : `${f.progress}%`}</span>
                      <button onClick={() => setFiles(fs => fs.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between pt-2">
                <Btn variant="outline" onClick={() => setStep(1)}>Back</Btn>
                <Btn variant="primary" onClick={() => setStep(3)}>Next: Pricing</Btn>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="text-sm font-semibold border-b border-border pb-3">Pricing & Submission</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Price (USD)</label>
                  <input type="number" placeholder="0.00" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring font-mono" />
                  <p className="text-[11px] text-muted-foreground mt-1">You receive 85% · Platform fee: 15%</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">License type</label>
                  <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                    <option>Commercial — Perpetual</option>
                    <option>Editorial — Perpetual</option>
                    <option>Commercial — 12 months</option>
                    <option>Exclusive</option>
                  </select>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-700">
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <p>Submitted content undergoes AV scanning and editorial review. Approval typically takes 24–48 hours. You will be notified by email once the review is complete.</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 space-y-2 text-sm">
                <p className="font-semibold text-xs text-muted-foreground uppercase tracking-wide mb-2">Submission Summary</p>
                {[["Type", type], ["Files", String(files.length)], ["Status after submit", "Under review"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium capitalize">{v}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-2">
                <Btn variant="outline" onClick={() => setStep(2)}>Back</Btn>
                <Btn variant="primary" onClick={() => onNavigate("reporter-reportages")}>Submit for Review</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

// ── Customer Mock Data ─────────────────────────────────────────────────────────
const PURCHASES_DATA = [
  { id: "ORD-9201", reportageId: "REP-0031", title: "Alpine Summit Coverage — Full Package", reporter: "Elena Marchetti", amount: 420, date: "2026-05-22", status: "completed", deliveryStatus: "ready", type: "photo", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80" },
  { id: "ORD-9145", reportageId: "REP-0028", title: "Singapore Trade Summit 2026", reporter: "Hiroshi Tanaka", amount: 520, date: "2026-05-19", status: "completed", deliveryStatus: "downloaded", type: "video", img: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=400&q=80" },
  { id: "ORD-9088", reportageId: "REP-0025", title: "Brussels Protests — Video Series", reporter: "Klaus Weber", amount: 380, date: "2026-05-14", status: "completed", deliveryStatus: "ready", type: "video", img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80" },
  { id: "ORD-8992", reportageId: "REP-0019", title: "Oslo Arctic Investigation Report", reporter: "Sofia Brennan", amount: 290, date: "2026-05-02", status: "completed", deliveryStatus: "downloaded", type: "photo", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&q=80" },
  { id: "ORD-8821", reportageId: "REP-0014", title: "Cairo Infrastructure Development", reporter: "Omar Khalil", amount: 180, date: "2026-04-20", status: "completed", deliveryStatus: "expired", type: "photo", img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&q=80" },
  { id: "ORD-8640", reportageId: "REP-0009", title: "Buenos Aires Economic Crisis", reporter: "Carlos Mendes", amount: 240, date: "2026-04-08", status: "refunded", deliveryStatus: "failed", type: "audio", img: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=400&q=80" },
];

const CUSTOMER_REQUESTS_DATA = [
  { id: "REQ-0041", title: "EU Council Emergency Session — Brussels", category: "Politics", budget: 850, deadline: "2026-06-05", status: "open", responses: 3, posted: "2026-05-20" },
  { id: "REQ-0044", title: "East Africa Drought — Ground Report", category: "Humanitarian", budget: 700, deadline: "2026-05-30", status: "open", responses: 2, posted: "2026-05-15" },
  { id: "REQ-0038", title: "Vienna Tech Forum Keynote Coverage", category: "Technology", budget: 600, deadline: "2026-05-28", status: "assigned", responses: 5, posted: "2026-05-08" },
  { id: "REQ-0029", title: "Berlin Startup Ecosystem 2026", category: "Business", budget: 500, deadline: "2026-05-02", status: "completed", responses: 4, posted: "2026-04-15" },
];

const CUSTOMER_DELIVERY_ITEMS = [
  { name: "main_video_4k.mp4", size: "2.1 GB", type: "Video", avStatus: "clean", hashOk: true },
  { name: "b_roll_footage.mp4", size: "840 MB", type: "Video", avStatus: "clean", hashOk: true },
  { name: "photos_bundle.zip", size: "1.2 GB", type: "Photos", avStatus: "clean", hashOk: true },
  { name: "transcript_en.pdf", size: "1.4 MB", type: "Document", avStatus: "clean", hashOk: true },
];

// ── SCREEN: Customer Purchases ─────────────────────────────────────────────────
function CustomerPurchasesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = useMemo(() =>
    PURCHASES_DATA
      .filter(p => statusFilter === "all" || p.deliveryStatus === statusFilter)
      .filter(p => p.title.toLowerCase().includes(q.toLowerCase()) || p.reporter.toLowerCase().includes(q.toLowerCase())),
    [q, statusFilter]);

  const deliveryStatuses = ["all", "ready", "downloaded", "expired", "failed"];
  const typeColor: Record<string, "blue" | "sky" | "gray"> = { photo: "blue", video: "sky", audio: "gray" };

  return (
    <Page title="My Purchases" breadcrumbs={["Customer", "Purchases"]}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <StatCard label="Total Orders" value={String(PURCHASES_DATA.length)} icon={Package} sub="all time" />
        <StatCard label="Spent" value={`$${PURCHASES_DATA.filter(p => p.status !== "refunded").reduce((s, p) => s + p.amount, 0).toLocaleString()}`} icon={DollarSign} sub="total" />
        <StatCard label="Ready" value={String(PURCHASES_DATA.filter(p => p.deliveryStatus === "ready").length)} icon={Download} sub="to download" />
        <StatCard label="Downloaded" value={String(PURCHASES_DATA.filter(p => p.deliveryStatus === "downloaded").length)} icon={CheckCircle} sub="complete" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1"><SearchInput placeholder="Search by title or reporter..." value={q} onChange={setQ} /></div>
        <div className="flex gap-1 p-1 bg-muted rounded-md flex-wrap">
          {deliveryStatuses.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                statusFilter === s ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
            <div className="flex gap-4 p-4">
              <div className="w-20 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      by <span className="font-medium text-foreground">{p.reporter}</span> · {p.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Chip color={typeColor[p.type]}>{p.type}</Chip>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-semibold text-foreground">${p.amount}</span>
                    <span className="text-xs font-mono text-muted-foreground">{p.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={p.deliveryStatus} />
                    {p.deliveryStatus === "ready" && (
                      <Btn variant="primary" size="sm" icon={Download} onClick={() => onNavigate("customer-deliveries")}>Download</Btn>
                    )}
                    {p.deliveryStatus === "downloaded" && (
                      <Btn variant="outline" size="sm" onClick={() => onNavigate("customer-deliveries")}>View Details</Btn>
                    )}
                    {p.deliveryStatus === "expired" && (
                      <Btn variant="outline" size="sm" icon={RefreshCw}>Re-request</Btn>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No purchases found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or browse the marketplace.</p>
            <Btn variant="primary" size="sm" className="mt-4" onClick={() => onNavigate("reportages-map")}>Browse Reportages</Btn>
          </div>
        )}
      </div>
      <Pagination current={1} total={1} onChange={() => {}} />
    </Page>
  );
}

// ── SCREEN: Customer Delivery Detail ──────────────────────────────────────────
function CustomerDeliveryDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const order = PURCHASES_DATA[0];
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (name: string) => {
    setDownloading(name);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <Page title="Delivery Detail" breadcrumbs={["Customer", "Purchases", order.id]}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">
          {/* Order header */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-semibold text-foreground">{order.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  by <span className="font-medium text-foreground">{order.reporter}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={order.status} />
                <StatusBadge status={order.deliveryStatus} />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {[["Order ID", order.id], ["Reportage", order.reportageId], ["Amount paid", `$${order.amount}`], ["Purchase date", order.date]].map(([k, v]) => (
                <div key={k}>
                  <p className="text-muted-foreground mb-0.5">{k}</p>
                  <p className="font-mono font-medium">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* File list */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Included Files</h3>
              <Btn variant="primary" size="sm" icon={Download}>Download All</Btn>
            </div>
            <div className="divide-y divide-border">
              {CUSTOMER_DELIVERY_ITEMS.map(f => (
                <div key={f.name} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/30">
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-medium text-foreground truncate">{f.name}</p>
                    <div className="flex items-center gap-3 mt-0.5 text-[11px]">
                      <span className="text-muted-foreground">{f.size}</span>
                      <Chip color="gray">{f.type}</Chip>
                      <span className={cn("flex items-center gap-1 font-medium",
                        f.avStatus === "clean" ? "text-emerald-600" : "text-red-500")}>
                        {f.avStatus === "clean"
                          ? <><CheckCircle className="w-3 h-3" />AV clean</>
                          : <><AlertCircle className="w-3 h-3" />Threat detected</>}
                      </span>
                      {f.hashOk && <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="w-3 h-3" />Hash OK</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(f.name)}
                    className={cn("flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors flex-shrink-0",
                      downloading === f.name
                        ? "bg-muted text-muted-foreground border-border cursor-wait"
                        : "bg-card text-foreground border-border hover:bg-secondary hover:border-primary/30")}>
                    {downloading === f.name
                      ? <><RefreshCw className="w-3 h-3 animate-spin" />Downloading…</>
                      : <><Download className="w-3 h-3" />Download</>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Integrity summary */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">Integrity Report</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "AV Scan", value: "All clean", ok: true },
                { label: "Hash verification", value: "All valid", ok: true },
                { label: "GPS metadata", value: "Present", ok: true },
                { label: "Last checked", value: "2h ago", ok: null },
              ].map(s => (
                <div key={s.label} className="bg-muted/30 rounded-md p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">{s.label}</p>
                  <p className={cn("text-xs font-medium flex items-center gap-1",
                    s.ok === true ? "text-emerald-600" : s.ok === false ? "text-red-500" : "text-muted-foreground")}>
                    {s.ok === true && <CheckCircle className="w-3 h-3" />}
                    {s.ok === false && <XCircle className="w-3 h-3" />}
                    {s.ok === null && <Clock className="w-3 h-3" />}
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <img src={order.img} alt={order.title} className="w-full h-36 object-cover" />
            <div className="p-4 space-y-3">
              <h4 className="text-sm font-semibold">License Details</h4>
              {[["Type", "Commercial"], ["Usage", "Worldwide"], ["Duration", "Perpetual"], ["Attribution", "Required"]].map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3">Reporter</h4>
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={order.reporter} size="lg" />
              <div>
                <p className="text-sm font-medium">{order.reporter}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" />Verified</p>
              </div>
            </div>
            <button onClick={() => onNavigate("reporter-profile")} className="text-xs text-primary hover:underline">View profile →</button>
          </div>
          <div className="space-y-2">
            <Btn variant="outline" full icon={AlertCircle}>Report an Issue</Btn>
            <Btn variant="outline" full icon={MessageSquare}>Contact Reporter</Btn>
          </div>
          <button onClick={() => onNavigate("customer-purchases")} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 w-full justify-center">
            <ChevronLeft className="w-3 h-3" />Back to purchases
          </button>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Customer Reportage Requests ───────────────────────────────────────
function CustomerReportageRequestsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [view, setView] = useState<"active" | "all">("active");
  const [showNew, setShowNew] = useState(false);

  const shown = view === "active"
    ? CUSTOMER_REQUESTS_DATA.filter(r => r.status === "open" || r.status === "assigned")
    : CUSTOMER_REQUESTS_DATA;

  const statusCounts = {
    open: CUSTOMER_REQUESTS_DATA.filter(r => r.status === "open").length,
    assigned: CUSTOMER_REQUESTS_DATA.filter(r => r.status === "assigned").length,
    completed: CUSTOMER_REQUESTS_DATA.filter(r => r.status === "completed").length,
  };

  return (
    <Page title="My Reportage Requests" breadcrumbs={["Customer", "Requests"]}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <StatCard label="Open" value={String(statusCounts.open)} icon={MessageSquare} sub="awaiting responses" />
        <StatCard label="Assigned" value={String(statusCounts.assigned)} icon={CheckCircle} sub="in progress" />
        <StatCard label="Completed" value={String(statusCounts.completed)} icon={Package} sub="fulfilled" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1 p-1 bg-muted rounded-md">
          {(["active", "all"] as const).map(v => (
            <button key={v} onClick={() => setView(v)}
              className={cn("px-3 py-1.5 text-xs rounded font-medium capitalize transition-colors",
                view === v ? "bg-card shadow text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {v === "active" ? "Active" : "All Requests"}
            </button>
          ))}
        </div>
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => setShowNew(s => !s)}>New Request</Btn>
      </div>

      {/* New request form */}
      {showNew && (
        <div className="bg-card border border-primary/30 rounded-lg p-5 mb-5">
          <h4 className="text-sm font-semibold mb-4">Post New Request</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title / Brief</label>
              <input placeholder="What coverage do you need?" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Category</label>
              <select className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring">
                {["Politics", "Conflict & War", "Technology", "Environment", "Business", "Culture", "Humanitarian"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Location</label>
              <input placeholder="e.g. Brussels, Belgium" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring focus:border-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Budget (USD)</label>
              <input type="number" placeholder="0.00" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Deadline</label>
              <input type="date" className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Requirements</label>
              <textarea rows={3} placeholder="Describe what you need: format, quantity, specific requirements..." className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="primary" size="sm">Post Request</Btn>
            <Btn variant="outline" size="sm" onClick={() => setShowNew(false)}>Cancel</Btn>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {shown.map(r => (
          <div key={r.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <StatusBadge status={r.status} />
                  <Chip color="amber">{r.category}</Chip>
                  <span className="text-[11px] font-mono text-muted-foreground">{r.id}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Posted {r.posted} · Deadline {r.deadline}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-mono font-semibold text-foreground">${r.budget}</p>
                <p className="text-[11px] text-muted-foreground">budget</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                <span><span className="font-semibold text-foreground">{r.responses}</span> response{r.responses !== 1 ? "s" : ""}</span>
              </div>
              <div className="flex gap-2">
                {(r.status === "open" || r.status === "assigned") && (
                  <button onClick={() => onNavigate("request-detail")} className="text-xs text-primary font-medium hover:underline">
                    View responses →
                  </button>
                )}
                {r.status === "completed" && (
                  <button onClick={() => onNavigate("customer-deliveries")} className="text-xs text-primary font-medium hover:underline">
                    View delivery →
                  </button>
                )}
                {r.status === "open" && (
                  <Btn variant="ghost" size="xs" icon={Trash2}>Close</Btn>
                )}
              </div>
            </div>
          </div>
        ))}

        {shown.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">No active requests</p>
            <p className="text-xs text-muted-foreground mt-1">Post a request to get coverage from verified reporters worldwide.</p>
            <Btn variant="primary" size="sm" className="mt-4" icon={Plus} onClick={() => setShowNew(true)}>Post Request</Btn>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Notifications ───────────────────────────────────────────────
function AdminNotificationsScreen() {
  const [filter, setFilter] = useState<"all" | "unread" | "high">("all");
  const notifIcon = (type: AdminNotifRow["type"]) => {
    const map = { fraud: AlertTriangle, "high-value": DollarSign, dispute: MessageSquare, withdrawal: ArrowUpRight, "av-alert": Shield, system: Server };
    return map[type] ?? Bell;
  };
  const notifColor = (type: AdminNotifRow["type"]) => {
    const map = { fraud: "text-red-500 bg-red-50", "high-value": "text-amber-500 bg-amber-50", dispute: "text-blue-500 bg-blue-50", withdrawal: "text-primary bg-primary/10", "av-alert": "text-orange-500 bg-orange-50", system: "text-muted-foreground bg-muted" };
    return map[type] ?? "text-muted-foreground bg-muted";
  };
  const visible = ADMIN_NOTIFS.filter(n => filter === "all" || (filter === "unread" && !n.read) || (filter === "high" && n.priority === "high"));
  const unreadCount = ADMIN_NOTIFS.filter(n => !n.read).length;
  return (
    <Page title="Notifications" breadcrumbs={["Admin", "Notifications"]}
      actions={<Btn variant="outline" icon={CheckCircle} size="xs">Mark all read</Btn>}
    >
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {([["all","All"], ["unread","Unread"], ["high","High Priority"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            filter === k ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          )}>
            {l}{k === "unread" && unreadCount > 0 && <span className="ml-1.5 bg-white/20 text-white rounded-full px-1.5 py-0.5 text-[10px]">{unreadCount}</span>}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} notification{visible.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-3"><Bell className="w-5 h-5 text-muted-foreground" /></div>
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs text-muted-foreground mt-1">You're all caught up.</p>
          </div>
        ) : visible.map((n, i) => {
          const Icon = notifIcon(n.type);
          return (
            <div key={n.id} className={cn("flex gap-3 px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors", !n.read && "bg-primary/[0.03]")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", notifColor(n.type))}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("text-sm font-medium", !n.read && "text-foreground")}>{n.title}</span>
                    {n.priority === "high" && <span className="text-[10px] font-semibold bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full">HIGH</span>}
                    {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                {n.ref && (
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{n.ref}</code>
                    <Btn variant="ghost" size="xs">View</Btn>
                    <Btn variant="ghost" size="xs">Dismiss</Btn>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Transaction Detail ──────────────────────────────────────────
function AdminTransactionDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const tx = TRANSACTIONS[0]; // TXN-4491 as example
  const timeline = [
    { time: "2026-05-23 14:32:01", event: "Transaction initiated", detail: "Deposit request received from client" },
    { time: "2026-05-23 14:32:03", event: "Fraud check passed",    detail: "Score: 12/100 — low risk" },
    { time: "2026-05-23 14:32:08", event: "Payment processed",     detail: "Wire transfer cleared by correspondent bank" },
    { time: "2026-05-23 14:33:15", event: "Wallet credited",       detail: `$${tx.amount.toLocaleString()} added to ${tx.user}'s wallet` },
    { time: "2026-05-23 14:33:16", event: "Completed",             detail: "Transaction finalized" },
  ];
  return (
    <Page title={tx.id} breadcrumbs={["Admin", "Transactions", tx.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-transactions")}>Back</Btn>
          <Btn variant="outline" icon={Download} size="xs">Receipt</Btn>
          <Btn variant="destructive" icon={AlertTriangle} size="xs">Flag</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Transaction Details</h3>
              <StatusBadge status={tx.status} />
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { label: "Transaction ID",  val: tx.id,                  mono: true },
                { label: "Reference",       val: tx.ref,                 mono: true },
                { label: "Type",            val: tx.type,                mono: false },
                { label: "Method",          val: tx.method,              mono: false },
                { label: "Amount",          val: `$${tx.amount.toLocaleString()} ${tx.currency}`, mono: true },
                { label: "Platform fee",    val: `$${(tx.amount * 0.01).toFixed(2)} (1.0%)`, mono: true },
                { label: "Net amount",      val: `$${(tx.amount * 0.99).toFixed(2)}`,       mono: true },
                { label: "Date & Time",     val: tx.date,                mono: true },
              ].map(({ label, val, mono }) => (
                <div key={label}>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
                  <p className={cn("text-sm font-medium", mono && "font-mono")}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Timeline</h3>
            </div>
            <div className="p-4">
              <div className="relative space-y-0">
                {timeline.map((t, i) => (
                  <div key={i} className="flex gap-3 pb-4 last:pb-0">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className={cn("w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0", i === timeline.length - 1 ? "bg-emerald-500" : "bg-primary")} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="min-w-0 pb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium">{t.event}</span>
                        <code className="text-[10px] font-mono text-muted-foreground">{t.time}</code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">User</p>
            <div className="flex items-center gap-2 mb-3">
              <Avatar name={tx.user} size="md" />
              <div>
                <p className="text-sm font-medium">{tx.user}</p>
                <p className="text-xs text-muted-foreground">USR-0024 · Customer</p>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span>Japan</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Wallet balance</span><span className="font-mono">$12,400.00</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status="active" /></div>
            </div>
            <Btn variant="outline" size="xs" full className="mt-3">View user</Btn>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Risk Assessment</p>
            <div className="space-y-2.5">
              {[
                { label: "Fraud score",    val: "12 / 100", color: "text-emerald-600" },
                { label: "KYC level",      val: "Verified",  color: "text-emerald-600" },
                { label: "IP reputation",  val: "Clean",     color: "text-emerald-600" },
                { label: "Velocity flag",  val: "None",      color: "text-muted-foreground" },
              ].map(({ label, val, color }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={cn("font-medium", color)}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Actions</p>
            <Btn variant="outline" icon={RefreshCw} size="xs" full>Refund transaction</Btn>
            <Btn variant="outline" icon={Copy}     size="xs" full>Copy receipt link</Btn>
            <Btn variant="destructive" icon={AlertTriangle} size="xs" full>Flag for review</Btn>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Wallet Detail ────────────────────────────────────────────────
function AdminWalletDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const user = USERS[3]; // Takeshi Morita — largest balance
  const [txFilter, setTxFilter] = useState<"all" | "deposit" | "withdrawal" | "purchase">("all");
  const txs = TRANSACTIONS.filter(t => txFilter === "all" || t.type === txFilter);
  return (
    <Page title="Wallet Detail" breadcrumbs={["Admin", "Financial", "Wallet Detail"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-transactions")}>Back</Btn>
          <Btn variant="outline" icon={Download} size="xs">Statement</Btn>
          <Btn variant="destructive" icon={Lock} size="xs">Freeze wallet</Btn>
        </>
      }
    >
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5">
        <div className="sm:col-span-1 bg-card border border-border rounded-lg p-4 flex items-center gap-3">
          <Avatar name={user.name} size="md" />
          <div>
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.id} · {user.role}</p>
            <StatusBadge status={user.status} />
          </div>
        </div>
        <StatCard label="Current Balance" value={`$${user.balance.toLocaleString()}`} trend="available" trendUp icon={Wallet} sub="USD" />
        <StatCard label="Total Deposited" value="$17,400" trend="lifetime" trendUp icon={ArrowUpRight} sub="6 transactions" />
        <StatCard label="Total Spent" value="$5,000" trend="lifetime" trendUp={false} icon={CreditCard} sub="3 purchases" />
      </div>

      {/* Transactions */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold mr-2">Transaction History</h3>
          {(["all","deposit","withdrawal","purchase"] as const).map(f => (
            <button key={f} onClick={() => setTxFilter(f)} className={cn(
              "px-2.5 py-1 text-xs rounded-md border transition-colors capitalize",
              txFilter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
            )}>{f}</button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">{txs.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50">
              <TH>ID</TH><TH>Type</TH><TH>Amount</TH><TH>Method</TH><TH>Status</TH><TH>Date</TH>
            </tr></thead>
            <tbody>
              {txs.map(tx => (
                <tr key={tx.id} className="hover:bg-secondary/30 transition-colors">
                  <TD mono>{tx.id}</TD>
                  <TD><Chip color={tx.type === "deposit" ? "green" : tx.type === "withdrawal" ? "amber" : "blue"}>{tx.type}</Chip></TD>
                  <TD mono className={tx.type === "deposit" ? "text-emerald-600" : "text-red-500"}>
                    {tx.type === "deposit" ? "+" : "−"}${tx.amount.toLocaleString()}
                  </TD>
                  <TD>{tx.method}</TD>
                  <TD><StatusBadge status={tx.status} /></TD>
                  <TD mono>{tx.date}</TD>
                </tr>
              ))}
              {txs.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-sm text-muted-foreground">No transactions match this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Platform Earnings ───────────────────────────────────────────
function AdminPlatformEarningsScreen() {
  const [period, setPeriod] = useState<"3m" | "6m" | "12m">("12m");
  const slices = { "3m": 3, "6m": 6, "12m": 12 } as const;
  const data = MONTHLY_EARNINGS.slice(-slices[period]);
  const totGross = MONTHLY_EARNINGS.reduce((s, r) => s + r.gross, 0);
  const totComm  = MONTHLY_EARNINGS.reduce((s, r) => s + r.commission, 0);
  const totNet   = MONTHLY_EARNINGS.reduce((s, r) => s + r.net, 0);
  return (
    <Page title="Platform Earnings" breadcrumbs={["Admin", "Financial", "Platform Earnings"]}
      actions={<Btn variant="outline" icon={Download} size="xs">Export CSV</Btn>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Gross Revenue"     value={`$${(totGross/1000).toFixed(0)}k`}  trend="+8.7% MoM" trendUp icon={TrendingUp}  sub="12 months" />
        <StatCard label="Commission Earned" value={`$${(totComm/1000).toFixed(1)}k`}   trend="10% rate"  trendUp icon={DollarSign}  sub="platform fee" />
        <StatCard label="Reporter Payouts"  value={`$${(totNet/1000).toFixed(0)}k`}    trend="90% share" trendUp icon={ArrowUpRight} sub="to reporters" />
        <StatCard label="Avg Order Value"   value="$218"                               trend="+$14 MoM"  trendUp icon={CreditCard}  sub="per purchase" />
      </div>

      {/* Chart + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold">Monthly Earnings</h3>
              <p className="text-xs text-muted-foreground">Gross revenue, commission, and reporter payouts</p>
            </div>
            <div className="flex gap-1">
              {(["3m","6m","12m"] as const).map(p => (
                <button key={p} onClick={() => setPeriod(p)} className={cn(
                  "px-2 py-1 text-xs rounded border transition-colors",
                  period === p ? "bg-primary text-white border-primary" : "border-border text-muted-foreground"
                )}>{p}</button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart id="ch-earnings" data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#5E6E99" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ fontSize: 12, borderRadius: 6, border: "1px solid var(--border)" }} />
              <Bar key="gross" dataKey="gross"      name="Gross"      fill="var(--muted)"    radius={[3,3,0,0]} />
              <Bar key="commission" dataKey="commission" name="Commission" fill="var(--primary)"  radius={[3,3,0,0]} opacity={0.6} />
              <Bar key="net" dataKey="net"        name="Payout"     fill="#10B981"         radius={[3,3,0,0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-muted-foreground justify-end">
            {[{c:"bg-muted", l:"Gross"},{c:"bg-primary opacity-60",l:"Commission"},{c:"bg-emerald-500 opacity-50",l:"Payout"}].map(({c,l}) => (
              <span key={l} className="flex items-center gap-1"><span className={cn("w-3 h-2 rounded-sm inline-block",c)} />{l}</span>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3">Revenue by Category</h3>
          <div className="space-y-3">
            {EARNINGS_BREAKDOWN.map(({ category, revenue, commission, pct, count }) => (
              <div key={category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium">{category}</span>
                  <span className="font-mono text-muted-foreground">${revenue.toLocaleString()}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                  <span>{count} sales · ${commission.toLocaleString()} commission</span>
                  <span>{pct}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-4 pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Commission Rates</p>
            {[
              { label: "Reportage purchase", rate: "10%" },
              { label: "Subscription plan",  rate: "100%" },
              { label: "Deposit processing", rate: "1.0%" },
            ].map(({ label, rate }) => (
              <div key={label} className="flex justify-between text-xs py-1 border-b border-border last:border-0">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold">{rate}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-semibold">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead><tr className="bg-secondary/50">
              <TH>Month</TH><TH>Gross Revenue</TH><TH>Commission (10%)</TH><TH>Reporter Payout</TH><TH>MoM Change</TH>
            </tr></thead>
            <tbody>
              {[...MONTHLY_EARNINGS].reverse().map((r, i, arr) => {
                const prev = arr[i + 1];
                const change = prev ? ((r.gross - prev.gross) / prev.gross * 100).toFixed(1) : null;
                return (
                  <tr key={r.month} className="hover:bg-secondary/30">
                    <TD><span className="font-medium">{r.month} 2026</span></TD>
                    <TD mono>${r.gross.toLocaleString()}</TD>
                    <TD mono className="text-primary">${r.commission.toLocaleString()}</TD>
                    <TD mono className="text-emerald-600">${r.net.toLocaleString()}</TD>
                    <TD>
                      {change !== null ? (
                        <span className={cn("text-xs font-medium flex items-center gap-0.5", parseFloat(change) >= 0 ? "text-emerald-600" : "text-red-500")}>
                          {parseFloat(change) >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(parseFloat(change))}%
                        </span>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </TD>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin User Activity ────────────────────────────────────────────────
function AdminUserActivityScreen() {
  const [search, setSearch] = useState("");
  const [resultFilter, setResultFilter] = useState<"all" | "success" | "failed" | "warning">("all");
  const filtered = useMemo(() =>
    ACTIVITY_LOG.filter(a => {
      if (resultFilter !== "all" && a.result !== resultFilter) return false;
      if (search && !a.user.toLowerCase().includes(search.toLowerCase()) && !a.action.toLowerCase().includes(search.toLowerCase()) && !a.resource.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }),
    [search, resultFilter]
  );
  const resultIcon = (r: ActivityRow["result"]) => r === "success" ? CheckCircle : r === "failed" ? XCircle : AlertTriangle;
  const resultColor = (r: ActivityRow["result"]) => r === "success" ? "text-emerald-500" : r === "failed" ? "text-red-500" : "text-amber-500";
  const roleColor = (role: string): "blue" | "gray" | "amber" => role === "admin" ? "amber" : role === "reporter" ? "blue" : "gray";
  return (
    <Page title="User Activity" breadcrumbs={["Admin", "Financial", "User Activity"]}
      actions={<Btn variant="outline" icon={Download} size="xs">Export log</Btn>}
    >
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <SearchInput placeholder="Search user, action, resource…" value={search} onChange={setSearch} />
        {(["all","success","failed","warning"] as const).map(f => (
          <button key={f} onClick={() => setResultFilter(f)} className={cn(
            "px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors capitalize",
            resultFilter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
          )}>{f}</button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} events</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr className="bg-secondary/50">
              <TH>Time</TH><TH>User</TH><TH>Action</TH><TH>Resource</TH><TH>IP Address</TH><TH>Result</TH>
            </tr></thead>
            <tbody>
              {filtered.map(a => {
                const Icon = resultIcon(a.result);
                return (
                  <tr key={a.id} className="hover:bg-secondary/30 transition-colors">
                    <TD mono><span className="text-[11px]">{a.time}</span></TD>
                    <TD>
                      <div className="flex items-center gap-1.5">
                        <Avatar name={a.user} />
                        <span className="text-xs max-w-[100px] truncate">{a.user}</span>
                        <Chip color={roleColor(a.role)}>{a.role}</Chip>
                      </div>
                    </TD>
                    <TD><span className="text-xs">{a.action}</span></TD>
                    <TD mono><span className="text-[11px]">{a.resource}</span></TD>
                    <TD mono><span className="text-[11px]">{a.ip}</span></TD>
                    <TD>
                      <div className="flex items-center gap-1">
                        <Icon className={cn("w-3.5 h-3.5", resultColor(a.result))} />
                        <span className={cn("text-xs capitalize", resultColor(a.result))}>{a.result}</span>
                      </div>
                    </TD>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-10 text-sm text-muted-foreground">No events match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination total={`${ACTIVITY_LOG.length}`} shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Withdrawals ──────────────────────────────────────────────────
function AdminWithdrawalsScreen() {
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "processing" | "completed" | "rejected">("all");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() =>
    WITHDRAWALS.filter(w => {
      if (statusFilter !== "all" && w.status !== statusFilter) return false;
      if (search && !w.user.toLowerCase().includes(search.toLowerCase()) && !w.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }),
    [statusFilter, search]
  );
  const pending   = WITHDRAWALS.filter(w => w.status === "pending");
  const processing = WITHDRAWALS.filter(w => w.status === "processing" || w.status === "approved");
  const todayDone  = WITHDRAWALS.filter(w => w.status === "completed" && w.processed?.startsWith("2026-05-24"));

  return (
    <Page title="Withdrawals" breadcrumbs={["Admin", "Financial", "Withdrawals"]}
      actions={<Btn variant="outline" icon={Download} size="xs">Export</Btn>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Pending"     value={`${pending.length}`}     trend={`$${pending.reduce((s,w)=>s+w.amount,0).toLocaleString()}`}     trendUp={false} icon={Clock}      sub="awaiting action" />
        <StatCard label="Processing"  value={`${processing.length}`}  trend={`$${processing.reduce((s,w)=>s+w.amount,0).toLocaleString()}`}  trendUp        icon={RefreshCw}  sub="in progress" />
        <StatCard label="Completed today" value={`${todayDone.length}`} trend={`$${todayDone.reduce((s,w)=>s+w.amount,0).toLocaleString()}`} trendUp        icon={CheckCircle} sub="processed" />
        <StatCard label="Total this month" value="$3,790" trend="+14%" trendUp icon={DollarSign} sub="May 2026" />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2 flex-wrap">
          <SearchInput placeholder="Search user or ID…" value={search} onChange={setSearch} />
          <div className="flex gap-1 flex-wrap">
            {(["all","pending","approved","processing","completed","rejected"] as const).map(f => (
              <button key={f} onClick={() => setStatusFilter(f)} className={cn(
                "px-2 py-1 text-[11px] rounded border transition-colors capitalize",
                statusFilter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
              )}>{f}</button>
            ))}
          </div>
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} records</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr className="bg-secondary/50">
              <TH>ID</TH><TH>Reporter</TH><TH>Amount</TH><TH>Method</TH><TH>Bank / Account</TH><TH>Requested</TH><TH>Status</TH><TH></TH>
            </tr></thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id} className="hover:bg-secondary/30 transition-colors">
                  <TD mono>{w.id}</TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar name={w.user} />
                      <div>
                        <span className="text-xs font-medium block">{w.user}</span>
                        <span className="text-[10px] text-muted-foreground">{w.userId}</span>
                      </div>
                    </div>
                  </TD>
                  <TD mono className="font-semibold">${w.amount.toLocaleString()}</TD>
                  <TD><span className="text-xs">{w.method}</span></TD>
                  <TD>
                    <div>
                      <span className="text-xs block">{w.bankName}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{w.bankAccount}</span>
                    </div>
                  </TD>
                  <TD mono><span className="text-[11px]">{w.requested}</span></TD>
                  <TD><StatusBadge status={w.status} /></TD>
                  <TD>
                    {w.status === "pending" ? (
                      <div className="flex gap-1">
                        <Btn variant="primary"     size="xs" icon={CheckCircle}>Approve</Btn>
                        <Btn variant="destructive" size="xs" icon={XCircle}>Reject</Btn>
                      </div>
                    ) : (
                      <Btn variant="ghost" size="xs" icon={Eye}>View</Btn>
                    )}
                  </TD>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-10 text-sm text-muted-foreground">No withdrawals match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination total={`${WITHDRAWALS.length}`} shown={filtered.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Order Detail ─────────────────────────────────────────────────
function AdminOrderDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const reportage = REPORTAGES[0]; // RPT-2241 — delivered example
  const tx = TRANSACTIONS[2];      // TXN-4489 — purchase
  const timeline = [
    { time: "2026-05-22 18:45", event: "Order placed",         detail: `${tx.user} purchased ${reportage.title}` },
    { time: "2026-05-22 18:45", event: "Payment confirmed",    detail: `$${tx.amount} via ${tx.method} (${tx.id})` },
    { time: "2026-05-22 18:46", event: "Delivery queued",      detail: "File packaging and AV scan initiated" },
    { time: "2026-05-22 18:52", event: "AV scan passed",       detail: "SHA-256 verified · no threats detected" },
    { time: "2026-05-22 18:53", event: "Download link issued", detail: "Secure link sent to buyer — expires 48h" },
    { time: "2026-05-23 09:11", event: "File downloaded",      detail: "1 of 1 assets downloaded by buyer" },
  ];
  return (
    <Page title="Order Detail" breadcrumbs={["Admin", "Financial", "Order Detail"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-reportages")}>Back</Btn>
          <Btn variant="outline" icon={Download} size="xs">Invoice</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Order ID",   val: "ORD-3821",    mono: true },
              { label: "Status",     el: <StatusBadge status="completed" /> },
              { label: "Order Date", val: "2026-05-22",  mono: true },
            ].map(({ label, val, mono, el }) => (
              <div key={label} className="bg-card border border-border rounded-lg px-4 py-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{label}</p>
                {el ?? <p className={cn("text-sm font-semibold", mono && "font-mono")}>{val}</p>}
              </div>
            ))}
          </div>

          {/* Reportage */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Purchased Reportage</h3>
            </div>
            <div className="p-4 flex gap-4">
              <img src={reportage.img} alt={reportage.title} className="w-28 h-20 object-cover rounded-md bg-muted flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold mb-1">{reportage.title}</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <Chip color="gray">{reportage.category}</Chip>
                  <Chip color="blue">{reportage.format}</Chip>
                  <StatusBadge status={reportage.status} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div><p className="text-muted-foreground">Reporter</p><p className="font-medium">{reportage.reporter}</p></div>
                  <div><p className="text-muted-foreground">Duration</p><p className="font-mono">{reportage.duration}</p></div>
                  <div><p className="text-muted-foreground">Sale price</p><p className="font-mono font-semibold">${reportage.price}</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Payment</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              {[
                { label: "Transaction",    val: tx.id,                            mono: true },
                { label: "Method",         val: tx.method,                        mono: false },
                { label: "Amount paid",    val: `$${tx.amount.toLocaleString()}`, mono: true },
                { label: "Platform fee",   val: `$${(tx.amount*0.1).toFixed(2)} (10%)`, mono: true },
                { label: "Reporter share", val: `$${(tx.amount*0.9).toFixed(2)} (90%)`, mono: true },
                { label: "Status",         el: <StatusBadge status={tx.status} /> },
              ].map(({ label, val, mono, el }) => (
                <div key={label}>
                  <p className="text-muted-foreground mb-0.5">{label}</p>
                  {el ?? <p className={cn("font-medium", mono && "font-mono")}>{val}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Order Timeline</h3>
            </div>
            <div className="p-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex gap-3 pb-3 last:pb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={cn("w-2.5 h-2.5 rounded-full mt-0.5", i === timeline.length - 1 ? "bg-emerald-500" : "bg-primary")} />
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-medium">{t.event}</span>
                      <code className="text-[10px] font-mono text-muted-foreground">{t.time}</code>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Buyer */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Buyer</p>
            <div className="flex items-center gap-2 mb-3">
              <Avatar name={tx.user} size="md" />
              <div>
                <p className="text-sm font-medium">{tx.user}</p>
                <p className="text-xs text-muted-foreground">USR-0024 · Customer</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span>Japan</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total orders</span><span>3</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account status</span><StatusBadge status="active" /></div>
            </div>
            <Btn variant="outline" size="xs" full className="mt-3">View profile</Btn>
          </div>

          {/* Delivery */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Delivery</p>
            <div className="space-y-2 text-xs">
              {[
                { label: "Delivery ID",   val: "DEL-0041",   mono: true },
                { label: "File size",     val: "1.2 GB",     mono: true },
                { label: "Format",        val: "MP4 (4K)",   mono: false },
                { label: "AV scan",       el: <Chip color="green">Clean</Chip> },
                { label: "Download",      el: <StatusBadge status="downloaded" /> },
                { label: "Link expires",  val: "2026-05-25", mono: true },
              ].map(({ label, val, mono, el }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{label}</span>
                  {el ?? <span className={cn("font-medium", mono && "font-mono")}>{val}</span>}
                </div>
              ))}
            </div>
            <Btn variant="outline" icon={Truck} size="xs" full className="mt-3">View delivery</Btn>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Error Inbox ─────────────────────────────────────────────────
function AdminErrorInboxScreen() {
  const [filter, setFilter] = useState<"all" | "unresolved" | "fatal" | "ignored">("all");
  const [search, setSearch] = useState("");
  const visible = useMemo(() => ERROR_INBOX.filter(e => {
    if (filter === "unresolved" && e.status !== "unresolved") return false;
    if (filter === "fatal"      && e.level !== "fatal")       return false;
    if (filter === "ignored"    && e.status !== "ignored")    return false;
    if (search && !e.message.toLowerCase().includes(search.toLowerCase()) && !e.service.includes(search)) return false;
    return true;
  }), [filter, search]);

  const unresolved = ERROR_INBOX.filter(e => e.status === "unresolved").length;
  const fatal      = ERROR_INBOX.filter(e => e.level === "fatal").length;
  const affected   = ERROR_INBOX.reduce((s, e) => s + e.users, 0);

  const levelCls = (l: ErrorRow["level"]) =>
    l === "fatal"   ? "bg-red-100 text-red-700 border-red-200" :
    l === "error"   ? "bg-orange-50 text-orange-700 border-orange-200" :
                      "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <Page title="Error Inbox" breadcrumbs={["Admin", "Monitoring", "Error Inbox"]}
      actions={<><Btn variant="outline" icon={Download} size="xs">Export</Btn><Btn variant="outline" icon={RefreshCw} size="xs">Refresh</Btn></>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Total Errors"     value={`${ERROR_INBOX.length}`} trend="all time"          trendUp={false} icon={AlertCircle}  sub="unique issues" />
        <StatCard label="Unresolved"       value={`${unresolved}`}         trend="need attention"    trendUp={false} icon={XCircle}      sub="open issues" />
        <StatCard label="Fatal"            value={`${fatal}`}              trend="critical severity" trendUp={false} icon={AlertTriangle} sub="highest priority" />
        <StatCard label="Affected Users"   value={`${affected}`}           trend="across all errors" trendUp={false} icon={Users}        sub="unique users" />
      </div>

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <SearchInput placeholder="Search message or service…" value={search} onChange={setSearch} />
        {(["all","unresolved","fatal","ignored"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors capitalize",
            filter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
          )}>{f}</button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} issues</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {visible.map((e, i) => (
          <div key={e.id} className={cn(
            "px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors",
            e.status === "unresolved" && e.level === "fatal" && "border-l-2 border-l-red-500"
          )}>
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize", levelCls(e.level))}>{e.level}</span>
                  <code className="text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded text-muted-foreground">{e.service}</code>
                  <code className="text-[10px] font-mono text-muted-foreground">{e.hash}</code>
                  {e.status !== "unresolved" && (
                    <span className={cn("text-[10px] font-medium capitalize", e.status === "resolved" ? "text-emerald-600" : "text-muted-foreground")}>{e.status}</span>
                  )}
                </div>
                <p className="text-sm font-medium text-foreground mb-0.5 truncate">{e.message}</p>
                <p className="text-xs font-mono text-muted-foreground truncate">{e.stack}</p>
                <div className="flex gap-4 mt-2 text-[11px] text-muted-foreground flex-wrap">
                  <span><strong className="text-foreground">{e.count.toLocaleString()}</strong> occurrences</span>
                  <span><strong className="text-foreground">{e.users}</strong> users affected</span>
                  <span>first {e.firstSeen}</span>
                  <span>last <strong className="text-foreground">{e.lastSeen}</strong></span>
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {e.status === "unresolved" && <Btn variant="primary"   size="xs" icon={CheckCircle}>Resolve</Btn>}
                {e.status === "unresolved" && <Btn variant="ghost"     size="xs">Ignore</Btn>}
                {e.status !== "unresolved" && <Btn variant="outline"   size="xs" icon={Eye}>View</Btn>}
              </div>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="flex flex-col items-center py-14 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-400 mb-3" />
            <p className="text-sm font-medium">No issues match the current filter</p>
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Logging Errors ───────────────────────────────────────────────
function AdminLoggingErrorsScreen() {
  const [levelFilter, setLevelFilter] = useState<"ALL" | "ERROR" | "WARN" | "INFO" | "DEBUG">("ALL");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [search, setSearch] = useState("");

  const services = ["all", ...Array.from(new Set(APP_LOGS.map(l => l.service)))];
  const visible = useMemo(() => APP_LOGS.filter(l => {
    if (levelFilter !== "ALL" && l.level !== levelFilter)           return false;
    if (serviceFilter !== "all" && l.service !== serviceFilter)     return false;
    if (search && !l.message.toLowerCase().includes(search.toLowerCase()) && !l.requestId.includes(search)) return false;
    return true;
  }), [levelFilter, serviceFilter, search]);

  const levelCls: Record<LogRow["level"], string> = {
    ERROR: "bg-red-100 text-red-700",
    WARN:  "bg-amber-100 text-amber-700",
    INFO:  "bg-sky-100 text-sky-700",
    DEBUG: "bg-slate-100 text-slate-500",
  };
  const levelDot: Record<LogRow["level"], string> = {
    ERROR: "bg-red-500", WARN: "bg-amber-400", INFO: "bg-sky-400", DEBUG: "bg-slate-400",
  };

  return (
    <Page title="Application Logs" breadcrumbs={["Admin", "Monitoring", "Logging"]}
      actions={<><Btn variant="outline" icon={Download} size="xs">Export</Btn><Btn variant="outline" icon={RefreshCw} size="xs">Live tail</Btn></>}
    >
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <SearchInput placeholder="Search message or request ID…" value={search} onChange={setSearch} />
        <div className="flex gap-1">
          {(["ALL","ERROR","WARN","INFO","DEBUG"] as const).map(l => (
            <button key={l} onClick={() => setLevelFilter(l)} className={cn(
              "px-2.5 py-1.5 text-[11px] font-mono font-semibold rounded border transition-colors",
              levelFilter === l
                ? l === "ERROR" ? "bg-red-500 text-white border-red-500"
                  : l === "WARN" ? "bg-amber-400 text-white border-amber-400"
                  : l === "INFO" ? "bg-sky-500 text-white border-sky-500"
                  : l === "DEBUG" ? "bg-slate-400 text-white border-slate-400"
                  : "bg-primary text-white border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}>{l}</button>
          ))}
        </div>
        <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)}
          className="text-xs px-2.5 py-1.5 border border-border rounded-md bg-white focus:outline-none">
          {services.map(s => <option key={s} value={s}>{s === "all" ? "All services" : s}</option>)}
        </select>
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} entries</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden font-mono">
        {visible.map(l => (
          <div key={l.id} className={cn(
            "flex gap-0 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors text-[11px]",
            l.level === "ERROR" && "bg-red-50/40",
            l.level === "WARN"  && "bg-amber-50/40",
          )}>
            <div className={cn("w-1 flex-shrink-0", levelDot[l.level])} />
            <div className="flex-1 px-3 py-2.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0", levelCls[l.level])}>{l.level}</span>
                <span className="text-muted-foreground flex-shrink-0">{l.time}</span>
                <code className="bg-secondary px-1.5 py-0.5 rounded text-muted-foreground flex-shrink-0">{l.service}</code>
                <code className="text-muted-foreground flex-shrink-0">{l.requestId}</code>
                {l.duration !== null && (
                  <span className={cn("text-muted-foreground flex-shrink-0", l.duration > 10000 && "text-amber-600 font-semibold")}>
                    {l.duration >= 1000 ? `${(l.duration/1000).toFixed(1)}s` : `${l.duration}ms`}
                  </span>
                )}
              </div>
              <p className="text-foreground leading-snug break-words">{l.message}</p>
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="flex flex-col items-center py-14 text-center font-sans">
            <p className="text-sm font-medium text-muted-foreground">No log entries match the current filters.</p>
          </div>
        )}
      </div>
      <div className="mt-2 text-right">
        <span className="text-[10px] text-muted-foreground font-mono">Showing last {APP_LOGS.length} entries · Auto-refresh off</span>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Feeds ────────────────────────────────────────────────────────
function AdminFeedsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [filter, setFilter] = useState<"all" | "active" | "error" | "paused">("all");
  const visible = FEEDS.filter(f => filter === "all" || f.status === filter);
  const active = FEEDS.filter(f => f.status === "active").length;
  const errors = FEEDS.filter(f => f.status === "error").length;
  const totalItems = FEEDS.reduce((s, f) => s + f.itemCount, 0);

  return (
    <Page title="Content Feeds" breadcrumbs={["Admin", "Feeds", "All Feeds"]}
      actions={<><Btn variant="primary" icon={Plus} size="xs">Add feed</Btn><Btn variant="outline" icon={RefreshCw} size="xs">Sync all</Btn></>}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <StatCard label="Active Feeds"  value={`${active}`}               trend="running"          trendUp icon={Radio}   sub="of 7 configured" />
        <StatCard label="Feed Errors"   value={`${errors}`}               trend="need attention"   trendUp={false} icon={AlertCircle} sub="last sync" />
        <StatCard label="Total Entries" value={totalItems.toLocaleString()} trend="all sources"    trendUp icon={Database} sub="all time" />
        <StatCard label="Last Sync"     value="09:05"                     trend="2026-05-24"       trendUp icon={RefreshCw} sub="most recent" />
      </div>

      <div className="flex gap-2 mb-4">
        {(["all","active","error","paused"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors capitalize",
            filter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
          )}>{f}{f === "error" && errors > 0 && <span className="ml-1.5 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-[9px]">{errors}</span>}</button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground self-center">{visible.length} feeds</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead><tr className="bg-secondary/50">
              <TH>Name</TH><TH>URL</TH><TH>Format</TH><TH>Category</TH>
              <TH>Interval</TH><TH>Last Fetched</TH><TH>Items</TH><TH>Status</TH><TH></TH>
            </tr></thead>
            <tbody>
              {visible.map(f => (
                <tr key={f.id} className="hover:bg-secondary/30 transition-colors">
                  <TD><span className="font-medium text-sm">{f.name}</span></TD>
                  <TD>
                    <span className="text-[11px] font-mono text-muted-foreground max-w-[180px] block truncate" title={f.url}>
                      {f.url.replace("https://","").replace("http://","")}
                    </span>
                  </TD>
                  <TD><Chip color={f.format === "JSON" ? "blue" : f.format === "Atom" ? "amber" : "gray"}>{f.format}</Chip></TD>
                  <TD><span className="text-xs">{f.category}</span></TD>
                  <TD mono><span className="text-xs">{f.interval}</span></TD>
                  <TD mono><span className="text-[11px]">{f.lastFetched}</span></TD>
                  <TD mono>{f.itemCount.toLocaleString()}</TD>
                  <TD>
                    <div>
                      <StatusBadge status={f.status} />
                      {f.errorMsg && <p className="text-[10px] text-red-600 mt-0.5">{f.errorMsg}</p>}
                    </div>
                  </TD>
                  <TD>
                    <div className="flex gap-1">
                      <Btn variant="ghost" size="xs" icon={RefreshCw} onClick={() => onNavigate("admin-feed-sources")} />
                      <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate("admin-feed-source-entries")} />
                      <Btn variant="ghost" size="xs" icon={MoreHorizontal} />
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination total={`${FEEDS.length}`} shown={visible.length} />
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Feed Sources ─────────────────────────────────────────────────
function AdminFeedSourcesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const visible = useMemo(() =>
    FEEDS.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.url.includes(search)),
    [search]
  );

  return (
    <Page title="Feed Sources" breadcrumbs={["Admin", "Feeds", "Sources"]}
      actions={<><Btn variant="primary" icon={Plus} size="xs">Add source</Btn><Btn variant="outline" icon={Download} size="xs">Export config</Btn></>}
    >
      <div className="flex gap-2 mb-4 items-center">
        <SearchInput placeholder="Search name or URL…" value={search} onChange={setSearch} />
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} sources</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visible.map(f => (
          <div key={f.id} className={cn(
            "bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow",
            f.status === "error" ? "border-red-200" : "border-border"
          )}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                  f.status === "active" ? "bg-primary/10" : f.status === "error" ? "bg-red-50" : "bg-muted"
                )}>
                  <Radio className={cn("w-4 h-4", f.status === "active" ? "text-primary" : f.status === "error" ? "text-red-500" : "text-muted-foreground")} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{f.name}</p>
                  <p className="text-[10px] font-mono text-muted-foreground truncate">{f.id} · {f.format}</p>
                </div>
              </div>
              <StatusBadge status={f.status} />
            </div>

            <div className="bg-secondary/50 rounded px-2.5 py-1.5 mb-3">
              <code className="text-[10px] text-muted-foreground break-all">{f.url}</code>
            </div>

            {f.errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded px-2.5 py-1.5 mb-3 flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span className="text-[10px] text-red-700">{f.errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 text-xs mb-3">
              <div><p className="text-muted-foreground">Interval</p><p className="font-mono font-medium">{f.interval}</p></div>
              <div><p className="text-muted-foreground">Entries</p><p className="font-medium">{f.itemCount.toLocaleString()}</p></div>
              <div><p className="text-muted-foreground">Category</p><p className="font-medium">{f.category}</p></div>
            </div>
            <p className="text-[10px] text-muted-foreground mb-3">Last sync: <span className="font-mono">{f.lastFetched}</span></p>

            <div className="flex gap-1.5 border-t border-border pt-3">
              <Btn variant="outline" icon={RefreshCw} size="xs">Sync now</Btn>
              <Btn variant="ghost"   icon={Eye}       size="xs" onClick={() => onNavigate("admin-feed-source-entries")}>Entries</Btn>
              <Btn variant="ghost"   icon={Edit}      size="xs">Edit</Btn>
              {f.status === "paused"
                ? <Btn variant="ghost" icon={Zap}   size="xs">Resume</Btn>
                : <Btn variant="ghost" icon={XIcon} size="xs">Pause</Btn>
              }
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Feed Source Entries ──────────────────────────────────────────
function AdminFeedSourceEntriesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const feed = FEEDS[0]; // Reuters — example source
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "processed" | "ignored" | "published">("all");
  const [search, setSearch] = useState("");
  const visible = useMemo(() =>
    FEED_ENTRIES.filter(e => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (search && !e.title.toLowerCase().includes(search.toLowerCase()) && !e.category.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    }), [statusFilter, search]
  );
  const statusCls = (s: FeedEntryRow["status"]) =>
    s === "new"       ? "bg-primary/10 text-primary border-primary/20" :
    s === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    s === "processed" ? "bg-sky-50 text-sky-700 border-sky-200" :
                        "bg-muted text-muted-foreground border-border";

  return (
    <Page title="Feed Entries" breadcrumbs={["Admin", "Feeds", feed.name]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-feed-sources")}>Sources</Btn>
          <Btn variant="outline" icon={Download} size="xs">Export</Btn>
        </>
      }
    >
      {/* Source banner */}
      <div className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Radio className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{feed.name}</p>
          <code className="text-[10px] font-mono text-muted-foreground">{feed.url}</code>
        </div>
        <div className="flex gap-3 text-xs text-right hidden sm:flex">
          <div><p className="text-muted-foreground">Format</p><Chip color="gray">{feed.format}</Chip></div>
          <div><p className="text-muted-foreground">Interval</p><p className="font-mono font-medium">{feed.interval}</p></div>
          <div><p className="text-muted-foreground">Last sync</p><p className="font-mono">{feed.lastFetched}</p></div>
        </div>
        <StatusBadge status={feed.status} />
      </div>

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <SearchInput placeholder="Search title or category…" value={search} onChange={setSearch} />
        {(["all","new","processed","published","ignored"] as const).map(f => (
          <button key={f} onClick={() => setStatusFilter(f)} className={cn(
            "px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors capitalize",
            statusFilter === f ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:text-foreground"
          )}>{f}</button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{visible.length} entries</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {visible.map(e => (
          <div key={e.id} className="flex gap-3 px-4 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize", statusCls(e.status))}>{e.status}</span>
                <Chip color="gray">{e.category}</Chip>
                {e.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">#{t}</span>
                ))}
              </div>
              <p className="text-sm font-medium leading-snug mb-0.5">{e.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{e.summary}</p>
              <div className="flex gap-3 mt-1.5 text-[10px] text-muted-foreground font-mono">
                <span>Published {e.published}</span>
                <span>Ingested {e.ingested}</span>
                <span>{e.source}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-shrink-0">
              <Btn variant="primary"     size="xs" icon={Newspaper} onClick={() => onNavigate("admin-feed-entry-detail")}>Publish</Btn>
              <Btn variant="ghost"       size="xs" icon={Eye}       onClick={() => onNavigate("admin-feed-entry-detail")}>View</Btn>
              {e.status !== "ignored" && <Btn variant="ghost" size="xs" icon={XIcon}>Ignore</Btn>}
            </div>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="flex flex-col items-center py-14 text-center">
            <Inbox className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">No entries match the current filter</p>
          </div>
        )}
      </div>
      <Pagination total={`${FEED_ENTRIES.length}`} shown={visible.length} />
    </Page>
  );
}

// ── SCREEN: Admin Feed Entry Detail ───────────────────────────────────────────
function AdminFeedEntryDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const entry = FEED_ENTRIES[0]; // FE-10041 flooding Kazakhstan
  const feed  = FEEDS.find(f => f.id === entry.sourceId)!;

  return (
    <Page title="Feed Entry" breadcrumbs={["Admin", "Feeds", "Entry Detail"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-feed-source-entries")}>Back</Btn>
          <Btn variant="outline" icon={XIcon}      size="xs">Ignore</Btn>
          <Btn variant="primary" icon={Newspaper}  size="xs">Publish as article</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Entry body */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Chip color="gray">{entry.category}</Chip>
              {entry.tags.map(t => (
                <span key={t} className="text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded font-mono">#{t}</span>
              ))}
              <span className={cn(
                "ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize",
                entry.status === "new" ? "bg-primary/10 text-primary border-primary/20" : "bg-emerald-50 text-emerald-700 border-emerald-200"
              )}>{entry.status}</span>
            </div>
            <h1 className="text-xl font-semibold leading-snug mb-4">{entry.title}</h1>
            <div className="flex gap-3 text-xs text-muted-foreground mb-4 flex-wrap">
              <span>Published <strong className="text-foreground font-mono">{entry.published}</strong></span>
              <span>Ingested <strong className="text-foreground font-mono">{entry.ingested}</strong></span>
              <code className="bg-secondary px-1.5 py-0.5 rounded">{entry.id}</code>
            </div>
            <p className="text-sm text-foreground leading-relaxed mb-4">{entry.summary}</p>
            <div className="h-px bg-border mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed italic">
              [Full article body would be fetched from the source feed on demand. The summary above contains the first paragraph extracted from the feed item description. Click "Fetch full content" to retrieve the complete article text for review before publishing.]
            </p>
            <Btn variant="outline" icon={ExternalLink} size="sm" className="mt-4">Fetch full content</Btn>
          </div>

          {/* Related entries */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Related Entries</h3>
            </div>
            {FEED_ENTRIES.filter(e => e.id !== entry.id && (e.category === entry.category || e.tags.some(t => entry.tags.includes(t)))).slice(0, 3).map(e => (
              <div key={e.id} className="flex gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => onNavigate("admin-feed-entry-detail")}>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium leading-snug line-clamp-2">{e.title}</p>
                  <div className="flex gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span>{e.source}</span>
                    <span>{e.published}</span>
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded border self-start capitalize flex-shrink-0",
                  e.status === "new" ? "bg-primary/10 text-primary border-primary/20" : "bg-sky-50 text-sky-700 border-sky-200"
                )}>{e.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Source info */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Source Feed</p>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Radio className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{feed.name}</p>
                <p className="text-[10px] text-muted-foreground">{feed.id} · {feed.format}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">Category</span><span>{feed.category}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Interval</span><span className="font-mono">{feed.interval}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status={feed.status} /></div>
            </div>
            <Btn variant="outline" icon={Eye} size="xs" full className="mt-3" onClick={() => onNavigate("admin-feed-sources")}>View source</Btn>
          </div>

          {/* Publish options */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Publish Options</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Assign to reporter</label>
                <select className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  <option>— unassigned —</option>
                  {["Daniyar Seitkali","Elena Marchetti","Amara Diallo"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Section</label>
                <select className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  <option>News Feed</option><option>Featured</option><option>Breaking</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">Publish immediately</span>
                <button className="w-9 h-5 bg-primary rounded-full relative flex-shrink-0">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
            <Btn variant="primary" icon={Newspaper} size="sm" full className="mt-3">Publish as article</Btn>
          </div>

          {/* Assign to request */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Link to Request</p>
            <p className="text-xs text-muted-foreground mb-3">Attach this entry to an open buyer request that matches the topic.</p>
            <Btn variant="outline" icon={MessageSquare} size="xs" full>Find matching requests</Btn>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Taxonomy List ───────────────────────────────────────────────
function AdminTaxonomyListScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | TaxonomyRow["type"]>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const TYPE_COLORS: Record<TaxonomyRow["type"], string> = {
    category: "bg-primary/10 text-primary border-primary/20",
    topic:    "bg-violet-50 text-violet-700 border-violet-200",
    tag:      "bg-sky-50 text-sky-700 border-sky-200",
    region:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return TAXONOMIES.filter(t =>
      (typeFilter === "all" || t.type === typeFilter) &&
      (t.name.toLowerCase().includes(q) || t.slug.includes(q))
    );
  }, [search, typeFilter]);

  const parentName = (id: string | null) => id ? (TAXONOMIES.find(t => t.id === id)?.name ?? "—") : "—";

  return (
    <Page title="Taxonomy" breadcrumbs={["Admin", "Taxonomy"]}
      actions={<Btn variant="primary" icon={Plus} size="sm" onClick={() => onNavigate("admin-taxonomy-new")}>New taxonomy</Btn>}
    >
      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Search name or slug…" className="flex-1 min-w-[200px]" />
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","category","topic","tag","region"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                typeFilter === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{t}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {(["category","topic","tag","region"] as const).map(t => (
          <div key={t} className="bg-card border border-border rounded-lg px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-muted-foreground capitalize font-medium">{t}s</p>
              <p className="text-xl font-bold tabular-nums">{TAXONOMIES.filter(tx => tx.type === t).length}</p>
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", TYPE_COLORS[t])}>{t}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <TH>Name</TH>
                <TH>Slug</TH>
                <TH>Type</TH>
                <TH>Parent</TH>
                <TH>Items</TH>
                <TH>Created</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No taxonomies match your filter.</td></tr>
              )}
              {rows.map(tx => (
                <tr key={tx.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <TD>
                    <div className="font-medium text-sm">{tx.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate max-w-[200px]">{tx.description}</div>
                  </TD>
                  <TD><code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">{tx.slug}</code></TD>
                  <TD>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", TYPE_COLORS[tx.type])}>{tx.type}</span>
                  </TD>
                  <TD><span className="text-xs text-muted-foreground">{parentName(tx.parent)}</span></TD>
                  <TD><span className="tabular-nums text-sm font-medium">{tx.count}</span></TD>
                  <TD><span className="font-mono text-xs text-muted-foreground">{tx.createdAt}</span></TD>
                  <TD>
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onNavigate("admin-taxonomy-new")} title="Edit">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                        onClick={() => setDeleteId(tx.id)} title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm dialog */}
      {deleteId && (() => {
        const tx = TAXONOMIES.find(t => t.id === deleteId)!;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Delete "{tx.name}"?</p>
                  <p className="text-xs text-muted-foreground">Used by {tx.count} items — those will lose this taxonomy.</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Btn variant="outline" size="sm" onClick={() => setDeleteId(null)}>Cancel</Btn>
                <Btn variant="destructive" size="sm" icon={Trash2} onClick={() => setDeleteId(null)}>Delete</Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </Page>
  );
}

// ── SCREEN: Admin Taxonomy New/Edit ───────────────────────────────────────────
function AdminTaxonomyNewScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const isEdit = false; // in a real app this would be driven by a route param
  const [name, setName]     = useState(isEdit ? "Elections" : "");
  const [slug, setSlug]     = useState(isEdit ? "elections" : "");
  const [type, setType]     = useState<TaxonomyRow["type"]>(isEdit ? "topic" : "category");
  const [parent, setParent] = useState(isEdit ? "TX-001" : "");
  const [description, setDescription] = useState(isEdit ? "National and local election coverage" : "");
  const [slugManual, setSlugManual] = useState(isEdit);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!slugManual) setSlug(v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const parentOptions = TAXONOMIES.filter(t => t.type === "category" || t.type === "region");

  return (
    <Page title={isEdit ? "Edit Taxonomy" : "New Taxonomy"} breadcrumbs={["Admin", "Taxonomy", isEdit ? "Edit" : "New"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-taxonomy-list")}>Cancel</Btn>
          <Btn variant="primary" icon={CheckCircle} size="sm">Save taxonomy</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold">Basic information</h3>

            <div>
              <label className="block text-xs font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <input
                value={name} onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. Climate Diplomacy"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Slug <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <input
                  value={slug}
                  onChange={e => { setSlugManual(true); setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }}
                  placeholder="climate-diplomacy"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md font-mono focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {slugManual && (
                  <button onClick={() => { setSlugManual(false); handleNameChange(name); }}
                    className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-secondary transition-colors text-muted-foreground">
                    Reset
                  </button>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">Used in URLs and API. Auto-generated from name unless edited.</p>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Description</label>
              <textarea
                value={description} onChange={e => setDescription(e.target.value)}
                rows={3}
                placeholder="Short description for editors and search…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Usage preview */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">Preview</h3>
            <div className="flex items-center gap-3 p-3 bg-secondary/40 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{name || <span className="text-muted-foreground italic">Taxonomy name</span>}</p>
                <code className="text-[10px] font-mono text-muted-foreground">/{type}/{slug || "slug"}</code>
              </div>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize flex-shrink-0",
                type === "category" ? "bg-primary/10 text-primary border-primary/20" :
                type === "topic"    ? "bg-violet-50 text-violet-700 border-violet-200" :
                type === "tag"      ? "bg-sky-50 text-sky-700 border-sky-200" :
                                      "bg-emerald-50 text-emerald-700 border-emerald-200"
              )}>{type}</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Type */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Type</p>
            <div className="space-y-2">
              {(["category","topic","tag","region"] as const).map(t => (
                <label key={t} className={cn(
                  "flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors",
                  type === t ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/40"
                )}>
                  <input type="radio" name="type" checked={type === t} onChange={() => setType(t)} className="accent-primary" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium capitalize">{t}</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">
                      {t === "category" ? "Top-level grouping for reportages" :
                       t === "topic"    ? "Focused subject within a category" :
                       t === "tag"      ? "Keyword label, freely applied" :
                                         "Geographic area or country grouping"}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Parent */}
          {(type === "topic" || type === "tag") && (
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Parent</p>
              <select value={parent} onChange={e => setParent(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                <option value="">— none —</option>
                {parentOptions.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <p className="text-[10px] text-muted-foreground mt-2 leading-snug">
                Nesting this {type} under a category or region helps with filtering and navigation.
              </p>
            </div>
          )}

          {/* Meta */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Meta</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex justify-between"><span>Status</span><span className="text-emerald-600 font-medium">Active</span></div>
              {isEdit && <div className="flex justify-between"><span>Items</span><span className="font-mono text-foreground">41</span></div>}
              {isEdit && <div className="flex justify-between"><span>Created</span><span className="font-mono text-foreground">2025-02-03</span></div>}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Global Settings ──────────────────────────────────────────────
function AdminCmsSettingsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  const fields = [
    { key: "site_name",        label: "Site name",           value: "GoDigiMarket",            type: "text" },
    { key: "tagline",          label: "Tagline",             value: "Global Reportage Marketplace", type: "text" },
    { key: "support_email",    label: "Support email",       value: "support@godigimarket.io", type: "email" },
    { key: "default_currency", label: "Default currency",    value: "USD",                     type: "select", options: ["USD","EUR","GBP"] },
    { key: "platform_fee_pct", label: "Platform fee (%)",    value: "10",                      type: "number" },
    { key: "max_file_size_mb", label: "Max upload size (MB)",value: "800",                     type: "number" },
    { key: "smtp_host",        label: "SMTP host",           value: "smtp.sendgrid.net",       type: "text" },
    { key: "smtp_port",        label: "SMTP port",           value: "587",                     type: "number" },
    { key: "maintenance_mode", label: "Maintenance mode",    value: false,                     type: "toggle" },
    { key: "registration_open",label: "Open registration",   value: true,                      type: "toggle" },
  ];
  return (
    <Page title="Global Settings" breadcrumbs={["Admin", "CMS", "Settings"]}
      actions={
        <>
          <Btn variant="ghost" size="xs" icon={Clock} onClick={() => onNavigate("admin-cms-settings-history")}>History</Btn>
          <Btn variant="primary" size="sm" icon={CheckCircle} onClick={() => setSaved(true)}>Save changes</Btn>
        </>
      }
    >
      {saved && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          Settings saved successfully.
          <button className="ml-auto text-emerald-500 hover:text-emerald-700" onClick={() => setSaved(false)}><XIcon className="w-3.5 h-3.5" /></button>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* Site identity */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-4">Site Identity</h3>
            <div className="space-y-4">
              {fields.filter(f => ["site_name","tagline","support_email"].includes(f.key)).map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input defaultValue={String(f.value)} type={f.type as string}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              ))}
            </div>
          </div>
          {/* Commerce */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-4">Commerce</h3>
            <div className="grid grid-cols-2 gap-4">
              {fields.filter(f => ["default_currency","platform_fee_pct","max_file_size_mb"].includes(f.key)).map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  {f.type === "select" ? (
                    <select defaultValue={String(f.value)} className="w-full px-2.5 py-2 text-sm bg-background border border-border rounded-md focus:outline-none">
                      {f.options?.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input defaultValue={String(f.value)} type={f.type as string}
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Mail */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-4">Mail Transport (SMTP)</h3>
            <div className="grid grid-cols-2 gap-4">
              {fields.filter(f => ["smtp_host","smtp_port"].includes(f.key)).map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-medium mb-1">{f.label}</label>
                  <input defaultValue={String(f.value)} type={f.type as string}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              ))}
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1">SMTP password</label>
                <input type="password" defaultValue="••••••••••••"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        </div>
        {/* Sidebar toggles + danger */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Feature Flags</p>
            <div className="space-y-3">
              {fields.filter(f => f.type === "toggle").map(f => {
                const [on, setOn] = useState(Boolean(f.value));
                return (
                  <div key={f.key} className="flex items-center justify-between">
                    <span className="text-xs font-medium">{f.label}</span>
                    <button onClick={() => setOn(p => !p)}
                      className={cn("w-9 h-5 rounded-full relative flex-shrink-0 transition-colors", on ? "bg-primary" : "bg-secondary")}>
                      <span className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all", on ? "right-0.5" : "left-0.5")} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">History</p>
            {CMS_SETTINGS_HISTORY.slice(0, 4).map(h => (
              <div key={h.id} className="py-2 border-b border-border last:border-0">
                <p className="text-xs font-mono text-muted-foreground">{h.field}</p>
                <p className="text-[10px] text-muted-foreground">{h.old} → <span className="text-foreground font-medium">{h.newVal}</span></p>
              </div>
            ))}
            <Btn variant="ghost" size="xs" icon={ChevronRight} full className="mt-2"
              onClick={() => onNavigate("admin-cms-settings-history")}>View full history</Btn>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600 mb-2">Danger Zone</p>
            <p className="text-xs text-red-700 mb-3">Flush all cache layers. This may cause a brief slowdown.</p>
            <Btn variant="destructive" size="xs" full icon={RefreshCw}>Flush cache</Btn>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Settings History ──────────────────────────────────────────────
function AdminCmsSettingsHistoryScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <Page title="Settings History" breadcrumbs={["Admin", "CMS", "Settings History"]}
      actions={<Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-settings")}>Settings</Btn>}
    >
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <TH>Field</TH>
                <TH>Old value</TH>
                <TH>New value</TH>
                <TH>Changed by</TH>
                <TH>At</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {CMS_SETTINGS_HISTORY.map(h => (
                <tr key={h.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <TD><code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">{h.field}</code></TD>
                  <TD><span className="text-xs text-muted-foreground line-through">{h.old}</span></TD>
                  <TD><span className="text-xs font-medium text-foreground">{h.newVal}</span></TD>
                  <TD><span className="text-xs">{h.user}</span></TD>
                  <TD><span className="font-mono text-xs text-muted-foreground">{h.at}</span></TD>
                  <TD>
                    <button className="text-[10px] text-primary hover:underline font-medium">Revert</button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Articles ──────────────────────────────────────────────────────
function AdminCmsArticlesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | CmsArticleRow["status"]>("all");

  const STATUS_COLORS: Record<CmsArticleRow["status"], string> = {
    published: "bg-emerald-50 text-emerald-700 border-emerald-200",
    draft:     "bg-secondary text-muted-foreground border-border",
    scheduled: "bg-violet-50 text-violet-700 border-violet-200",
    archived:  "bg-amber-50 text-amber-700 border-amber-200",
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return CMS_ARTICLES.filter(a =>
      (status === "all" || a.status === status) &&
      (a.title.toLowerCase().includes(q) || a.slug.includes(q))
    );
  }, [search, status]);

  return (
    <Page title="Articles" breadcrumbs={["Admin", "CMS", "Articles"]}
      actions={<Btn variant="primary" icon={Plus} size="sm" onClick={() => onNavigate("admin-cms-article-new")}>New article</Btn>}
    >
      <div className="flex gap-2 mb-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Search title or slug…" className="flex-1 min-w-[200px]" />
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","published","draft","scheduled","archived"] as const).map(s => (
            <button key={s} onClick={() => setStatus(s)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                status === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <TH>Title</TH>
                <TH>Section</TH>
                <TH>Author</TH>
                <TH>Status</TH>
                <TH>Views</TH>
                <TH>Published</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No articles found.</td></tr>
              )}
              {rows.map(a => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <TD>
                    <button className="text-sm font-medium hover:text-primary text-left transition-colors line-clamp-1"
                      onClick={() => onNavigate("admin-cms-article-detail")}>{a.title}</button>
                    <code className="text-[10px] text-muted-foreground font-mono">{a.slug}</code>
                  </TD>
                  <TD><Chip color="gray">{a.section}</Chip></TD>
                  <TD><span className="text-xs">{a.author}</span></TD>
                  <TD>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", STATUS_COLORS[a.status])}>{a.status}</span>
                  </TD>
                  <TD><span className="tabular-nums text-sm">{a.views > 0 ? a.views.toLocaleString() : "—"}</span></TD>
                  <TD><span className="font-mono text-xs text-muted-foreground">{a.publishedAt ?? "—"}</span></TD>
                  <TD>
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onNavigate("admin-cms-article-detail")} title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => onNavigate("admin-cms-article-edit")} title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Article Detail ────────────────────────────────────────────────
function AdminCmsArticleDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const a = CMS_ARTICLES[0];
  return (
    <Page title="Article Detail" breadcrumbs={["Admin", "CMS", "Articles", a.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-articles")}>Articles</Btn>
          <Btn variant="outline" icon={Edit} size="xs" onClick={() => onNavigate("admin-cms-article-edit")}>Edit</Btn>
          <Btn variant="destructive" size="xs" icon={Trash2}>Delete</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex gap-2 mb-3">
              <Chip color="gray">{a.section}</Chip>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">published</span>
            </div>
            <h1 className="text-xl font-semibold leading-snug mb-2">{a.title}</h1>
            <p className="text-xs text-muted-foreground font-mono mb-4">/{a.slug}</p>
            <div className="h-px bg-border mb-4" />
            <div className="prose prose-sm max-w-none text-sm text-foreground leading-relaxed space-y-3">
              <p>GoDigiMarket was founded on a simple premise: breaking news happens everywhere, but the infrastructure to monetize eyewitness footage rarely reaches the people who actually risk their lives to capture it.</p>
              <p>Our marketplace creates a direct channel between field reporters and global media buyers — from broadcast networks to digital publishers — with automated rights management, secure delivery, and instant settlement built in.</p>
              <p>Since launch we have facilitated over 2,400 reportage transactions across 87 countries, with an average time-to-delivery of under four hours from submission to buyer download.</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">SEO Preview</h3>
            <div className="border border-border rounded-lg p-3 bg-background">
              <p className="text-primary text-sm font-medium hover:underline cursor-pointer truncate">{a.title} — GoDigiMarket</p>
              <p className="text-xs text-emerald-700 font-mono">godigimarket.io/{a.slug}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">GoDigiMarket was founded on a simple premise: breaking news happens everywhere, but the infrastructure to monetize eyewitness footage rarely reaches the people who actually risk their lives to capture it.</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-2.5 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Meta</p>
            <div className="flex justify-between"><span className="text-muted-foreground">ID</span><code className="font-mono">{a.id}</code></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Author</span><span>{a.author}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Published</span><span className="font-mono">{a.publishedAt}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="font-mono">{a.updatedAt}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Views</span><span className="tabular-nums font-medium">{a.views.toLocaleString()}</span></div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Actions</p>
            <div className="space-y-2">
              <Btn variant="outline" icon={ExternalLink} size="xs" full>View on site</Btn>
              <Btn variant="outline" icon={Copy}         size="xs" full>Duplicate</Btn>
              <Btn variant="outline" icon={Download}     size="xs" full>Export as HTML</Btn>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Article New/Edit ──────────────────────────────────────────────
function AdminCmsArticleEditScreen({ onNavigate, isNew }: { onNavigate: (s: Screen) => void; isNew?: boolean }) {
  const a = isNew ? null : CMS_ARTICLES[0];
  const [title, setTitle]     = useState(a?.title ?? "");
  const [slug, setSlug]       = useState(a?.slug ?? "");
  const [section, setSection] = useState(a?.section ?? "Blog");
  const [slugManual, setSlugManual] = useState(!isNew);
  const [status, setStatus]   = useState<CmsArticleRow["status"]>(a?.status ?? "draft");

  const handleTitle = (v: string) => {
    setTitle(v);
    if (!slugManual) setSlug(v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  const STATUS_OPTS: CmsArticleRow["status"][] = ["draft","published","scheduled","archived"];

  return (
    <Page title={isNew ? "New Article" : "Edit Article"} breadcrumbs={["Admin", "CMS", "Articles", isNew ? "New" : "Edit"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-articles")}>Cancel</Btn>
          {!isNew && <Btn variant="outline" icon={Eye} size="xs" onClick={() => onNavigate("admin-cms-article-detail")}>Preview</Btn>}
          <Btn variant="primary" icon={CheckCircle} size="sm">Save</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1">Title <span className="text-red-500">*</span></label>
              <input value={title} onChange={e => handleTitle(e.target.value)}
                placeholder="Article title…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Slug</label>
              <div className="flex gap-2">
                <input value={slug} onChange={e => { setSlugManual(true); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")); }}
                  placeholder="article-slug"
                  className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                {slugManual && <button onClick={() => { setSlugManual(false); handleTitle(title); }}
                  className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-secondary text-muted-foreground">Reset</button>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Body <span className="text-muted-foreground font-normal">(Markdown / rich text)</span></label>
              <div className="border border-border rounded-md overflow-hidden">
                <div className="flex gap-1 px-2 py-1.5 bg-secondary/40 border-b border-border flex-wrap">
                  {["B","I","H2","H3","Link","Quote","Code","Image"].map(t => (
                    <button key={t} className="px-2 py-0.5 text-xs rounded hover:bg-card font-mono border border-transparent hover:border-border transition-colors">{t}</button>
                  ))}
                </div>
                <textarea rows={12}
                  defaultValue={isNew ? "" : "GoDigiMarket was founded on a simple premise: breaking news happens everywhere, but the infrastructure to monetize eyewitness footage rarely reaches the people who actually risk their lives to capture it.\n\nOur marketplace creates a direct channel between field reporters and global media buyers — from broadcast networks to digital publishers — with automated rights management, secure delivery, and instant settlement built in."}
                  className="w-full px-3 py-2 text-sm bg-background focus:outline-none resize-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Excerpt</label>
              <textarea rows={2} placeholder="Short description for cards and SEO…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Publish</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as CmsArticleRow["status"])}
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none capitalize">
                  {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {status === "scheduled" && (
                <div>
                  <label className="block text-xs font-medium mb-1">Publish at</label>
                  <input type="datetime-local" className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium mb-1">Author</label>
                <select className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  {["Admin","Elena Marchetti","Daniyar Seitkali","Amara Diallo"].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Organisation</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Section</label>
                <select value={section} onChange={e => setSection(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  {["Blog","Guides","Updates","News","Reports"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Tags</label>
                <input placeholder="comma-separated tags…"
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none" />
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">SEO</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Meta title</label>
                <input placeholder="Overrides article title" defaultValue={isNew ? "" : `${a?.title} — GoDigiMarket`}
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Meta description</label>
                <textarea rows={2} placeholder="150–160 characters…"
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Pages ─────────────────────────────────────────────────────────
function AdminCmsPagesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");

  const TMPL_COLORS: Record<CmsPageRow["template"], string> = {
    standard: "bg-secondary text-muted-foreground border-border",
    landing:  "bg-sky-50 text-sky-700 border-sky-200",
    legal:    "bg-amber-50 text-amber-700 border-amber-200",
  };

  const rows = useMemo(() =>
    CMS_PAGES.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())),
    [search]
  );

  return (
    <Page title="Basic Pages" breadcrumbs={["Admin", "CMS", "Pages"]}
      actions={<Btn variant="primary" icon={Plus} size="sm" onClick={() => onNavigate("admin-cms-page-new")}>New page</Btn>}
    >
      <div className="mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search title or slug…" className="max-w-sm" />
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <TH>Title</TH>
                <TH>Slug</TH>
                <TH>Template</TH>
                <TH>Status</TH>
                <TH>Updated</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <TD>
                    <button className="text-sm font-medium hover:text-primary text-left transition-colors"
                      onClick={() => onNavigate("admin-cms-page-detail")}>{p.title}</button>
                  </TD>
                  <TD><code className="text-xs bg-secondary px-1.5 py-0.5 rounded font-mono">/{p.slug}</code></TD>
                  <TD><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", TMPL_COLORS[p.template])}>{p.template}</span></TD>
                  <TD>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize",
                      p.status === "published" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-secondary text-muted-foreground border-border"
                    )}>{p.status}</span>
                  </TD>
                  <TD><span className="font-mono text-xs text-muted-foreground">{p.updatedAt}</span></TD>
                  <TD>
                    <div className="flex items-center gap-1 justify-end">
                      <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                        onClick={() => onNavigate("admin-cms-page-detail")} title="View"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                        onClick={() => onNavigate("admin-cms-page-edit")} title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Page Detail ───────────────────────────────────────────────────
function AdminCmsPageDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const p = CMS_PAGES[0];
  return (
    <Page title="Page Detail" breadcrumbs={["Admin", "CMS", "Pages", p.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-pages")}>Pages</Btn>
          <Btn variant="outline" icon={Edit} size="xs" onClick={() => onNavigate("admin-cms-page-edit")}>Edit</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex gap-2 mb-3">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-secondary text-muted-foreground border-border capitalize">{p.template}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">{p.status}</span>
            </div>
            <h1 className="text-xl font-semibold mb-1">{p.title}</h1>
            <p className="text-xs font-mono text-muted-foreground mb-4">/{p.slug}</p>
            <div className="h-px bg-border mb-4" />
            <div className="text-sm text-foreground leading-relaxed space-y-3">
              <p>GoDigiMarket is the world's first marketplace purpose-built for professional video reportages. We connect accredited field journalists with broadcast networks, streaming platforms, and digital publishers who need timely, exclusive footage from the scenes that matter.</p>
              <p>Founded in 2024, we have grown to serve reporters in over 90 countries and buyers in more than 40 media markets. Our platform handles rights management, secure delivery via encrypted CDN, and instant payments in 12 currencies.</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4 space-y-2.5 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Meta</p>
            <div className="flex justify-between"><span className="text-muted-foreground">ID</span><code className="font-mono">{p.id}</code></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Template</span><span className="capitalize">{p.template}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="font-mono">{p.updatedAt}</span></div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Actions</p>
            <div className="space-y-2">
              <Btn variant="outline" icon={ExternalLink} size="xs" full>View on site</Btn>
              <Btn variant="outline" icon={Copy}         size="xs" full>Duplicate</Btn>
              <Btn variant="destructive"                  size="xs" full icon={Trash2}>Delete</Btn>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Page New/Edit ─────────────────────────────────────────────────
function AdminCmsPageEditScreen({ onNavigate, isNew }: { onNavigate: (s: Screen) => void; isNew?: boolean }) {
  const p = isNew ? null : CMS_PAGES[0];
  const [title, setTitle]       = useState(p?.title ?? "");
  const [slug, setSlug]         = useState(p?.slug ?? "");
  const [template, setTemplate] = useState<CmsPageRow["template"]>(p?.template ?? "standard");
  const [status, setStatus]     = useState<CmsPageRow["status"]>(p?.status ?? "draft");
  const [slugManual, setSlugManual] = useState(!isNew);

  const handleTitle = (v: string) => {
    setTitle(v);
    if (!slugManual) setSlug(v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
  };

  return (
    <Page title={isNew ? "New Page" : "Edit Page"} breadcrumbs={["Admin", "CMS", "Pages", isNew ? "New" : "Edit"]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-pages")}>Cancel</Btn>
          {!isNew && <Btn variant="outline" icon={Eye} size="xs" onClick={() => onNavigate("admin-cms-page-detail")}>Preview</Btn>}
          <Btn variant="primary" icon={CheckCircle} size="sm">Save</Btn>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1">Title <span className="text-red-500">*</span></label>
              <input value={title} onChange={e => handleTitle(e.target.value)} placeholder="Page title…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Slug</label>
              <div className="flex gap-2">
                <input value={slug} onChange={e => { setSlugManual(true); setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")); }}
                  placeholder="page-slug"
                  className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                {slugManual && <button onClick={() => { setSlugManual(false); handleTitle(title); }}
                  className="px-3 py-1.5 text-xs border border-border rounded-md hover:bg-secondary text-muted-foreground">Reset</button>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Body</label>
              <div className="border border-border rounded-md overflow-hidden">
                <div className="flex gap-1 px-2 py-1.5 bg-secondary/40 border-b border-border flex-wrap">
                  {["B","I","H2","H3","Link","Quote","Code","Image"].map(t => (
                    <button key={t} className="px-2 py-0.5 text-xs rounded hover:bg-card font-mono border border-transparent hover:border-border transition-colors">{t}</button>
                  ))}
                </div>
                <textarea rows={12}
                  defaultValue={isNew ? "" : "GoDigiMarket is the world's first marketplace purpose-built for professional video reportages…"}
                  className="w-full px-3 py-2 text-sm bg-background focus:outline-none resize-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Publish</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as CmsPageRow["status"])}
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Template</label>
                <select value={template} onChange={e => setTemplate(e.target.value as CmsPageRow["template"])}
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
                  <option value="standard">Standard</option>
                  <option value="landing">Landing page</option>
                  <option value="legal">Legal / policy</option>
                </select>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">SEO</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Meta title</label>
                <input placeholder="Overrides page title"
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Meta description</label>
                <textarea rows={2} placeholder="150–160 characters…"
                  className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none resize-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Public Menus ──────────────────────────────────────────────────
function AdminCmsMenusScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const LOC_COLORS: Record<CmsMenuRow["location"], string> = {
    header: "bg-primary/10 text-primary border-primary/20",
    footer: "bg-sky-50 text-sky-700 border-sky-200",
    mobile: "bg-violet-50 text-violet-700 border-violet-200",
  };
  return (
    <Page title="Public Menus" breadcrumbs={["Admin", "CMS", "Menus"]}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {CMS_MENUS.map(m => (
          <div key={m.id} className="bg-card border border-border rounded-lg p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", LOC_COLORS[m.location])}>{m.location}</span>
              <span className="text-[10px] font-mono text-muted-foreground">{m.id}</span>
            </div>
            <p className="text-sm font-semibold">{m.name}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <List className="w-3 h-3" />
              <span>{m.itemCount} items</span>
              <span className="ml-auto font-mono">{m.updatedAt}</span>
            </div>
            <div className="flex gap-2 mt-auto">
              <Btn variant="outline" size="xs" icon={List} full onClick={() => onNavigate("admin-cms-menu-items")}>Manage items</Btn>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">All menus</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <TH>Name</TH>
                <TH>Location</TH>
                <TH>Items</TH>
                <TH>Updated</TH>
                <TH></TH>
              </tr>
            </thead>
            <tbody>
              {CMS_MENUS.map(m => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <TD><span className="text-sm font-medium">{m.name}</span></TD>
                  <TD><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", LOC_COLORS[m.location])}>{m.location}</span></TD>
                  <TD><span className="tabular-nums text-sm">{m.itemCount}</span></TD>
                  <TD><span className="font-mono text-xs text-muted-foreground">{m.updatedAt}</span></TD>
                  <TD>
                    <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                      onClick={() => onNavigate("admin-cms-menu-items")} title="Edit items"><Edit className="w-3.5 h-3.5" /></button>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: CMS Menu Items ────────────────────────────────────────────────────
function AdminCmsMenuItemsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const menu = CMS_MENUS[0];
  const items = CMS_MENU_ITEMS.filter(i => i.menuId === menu.id);
  const topLevel = items.filter(i => i.parent === null).sort((a, b) => a.order - b.order);
  const children = (parentId: string) => items.filter(i => i.parent === parentId).sort((a, b) => a.order - b.order);
  const [addOpen, setAddOpen] = useState(false);

  const TYPE_COLORS: Record<CmsMenuItemRow["type"], string> = {
    page:     "bg-secondary text-muted-foreground border-border",
    link:     "bg-sky-50 text-sky-700 border-sky-200",
    dropdown: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <Page title="Menu Items" breadcrumbs={["Admin", "CMS", "Menus", menu.name]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-cms-menus")}>Menus</Btn>
          <Btn variant="primary" icon={Plus} size="sm" onClick={() => setAddOpen(true)}>Add item</Btn>
        </>
      }
    >
      {/* Menu selector */}
      <div className="flex gap-2 mb-4">
        {CMS_MENUS.map(m => (
          <button key={m.id} className={cn("px-3 py-1.5 text-xs rounded-md border font-medium transition-colors capitalize",
            m.id === menu.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"
          )}>{m.location} — {m.name}</button>
        ))}
      </div>

      {/* Item tree */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="text-sm font-semibold">{menu.name}</span>
          <span className="text-xs text-muted-foreground">{items.length} items</span>
        </div>
        <div className="divide-y divide-border">
          {topLevel.map(item => (
            <div key={item.id}>
              <div className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors">
                <div className="w-5 h-5 rounded bg-secondary/60 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-muted-foreground">{item.order}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <code className="text-[10px] font-mono text-muted-foreground">{item.url}</code>
                </div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", TYPE_COLORS[item.type])}>{item.type}</span>
                <div className="flex gap-1 ml-2">
                  <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {children(item.id).map(child => (
                <div key={child.id} className="flex items-center gap-3 px-4 py-2.5 pl-12 bg-secondary/10 border-t border-border hover:bg-secondary/20 transition-colors">
                  <div className="w-4 h-4 border-l-2 border-b-2 border-border rounded-bl-sm mr-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{child.label}</p>
                    <code className="text-[10px] font-mono text-muted-foreground">{child.url}</code>
                  </div>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", TYPE_COLORS[child.type])}>{child.type}</span>
                  <div className="flex gap-1 ml-2">
                    <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"><Edit className="w-3.5 h-3.5" /></button>
                    <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Add item modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Add menu item</h3>
              <button onClick={() => setAddOpen(false)} className="text-muted-foreground hover:text-foreground"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Label</label>
                <input placeholder="e.g. Contact" className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">URL / path</label>
                <input placeholder="/contact" className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md font-mono focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Type</label>
                <select className="w-full px-2.5 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none">
                  <option>link</option><option>page</option><option>dropdown</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Parent (optional)</label>
                <select className="w-full px-2.5 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none">
                  <option value="">— top level —</option>
                  {topLevel.filter(i => i.type === "dropdown").map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setAddOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={Plus} onClick={() => setAddOpen(false)}>Add item</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin User Detail ─────────────────────────────────────────────────
function AdminUserDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const u = USERS[0]; // Elena Marchetti — representative reporter account
  const [status, setStatus] = useState<UserStatus>(u.status);
  const [suspendOpen, setSuspendOpen] = useState(false);

  const recentTx = TRANSACTIONS.filter(t => t.user === u.name).slice(0, 5);
  const recentReportages = REPORTAGES.filter(r => r.reporter === u.name).slice(0, 4);

  const STATUS_COLORS: Record<UserStatus, string> = {
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
    pending:   "bg-amber-50 text-amber-700 border-amber-200",
    banned:    "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Page title="User Detail" breadcrumbs={["Admin", "Users", u.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-users")}>Users</Btn>
          <Btn variant="outline" icon={Edit} size="xs" onClick={() => onNavigate("admin-user-edit")}>Edit</Btn>
          {status === "active"
            ? <Btn variant="destructive" size="xs" icon={Lock} onClick={() => setSuspendOpen(true)}>Suspend</Btn>
            : <Btn variant="outline" size="xs" icon={CheckCircle} onClick={() => setStatus("active")}>Reinstate</Btn>
          }
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column — identity + stats */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex flex-col items-center text-center mb-4">
              <img src={u.avatar} alt={u.name}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-border mb-3" />
              <h2 className="text-base font-semibold leading-tight">{u.name}</h2>
              <p className="text-xs text-muted-foreground mb-2">{u.email}</p>
              <div className="flex gap-2 flex-wrap justify-center">
                <Chip color={u.role === "reporter" ? "blue" : "gray"}>{u.role}</Chip>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", STATUS_COLORS[status])}>{status}</span>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="w-3.5 h-3.5 flex-shrink-0" /><span>{u.country}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Bell className="w-3.5 h-3.5 flex-shrink-0" /><span>{u.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" /><span>Joined {u.joined}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" /><span>Last login {u.lastLogin}</span>
              </div>
            </div>
            <div className="h-px bg-border my-4" />
            <p className="text-xs text-muted-foreground leading-relaxed">{u.bio}</p>
          </div>

          {/* Verification */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Verification</p>
            <div className="space-y-2.5">
              {[
                { label: "Email verified", ok: u.emailVerified },
                { label: "KYC verified",   ok: u.kycVerified },
                { label: "Phone confirmed", ok: !!u.phone },
              ].map(({ label, ok }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs">{label}</span>
                  {ok
                    ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                    : <XCircle className="w-4 h-4 text-red-400" />
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Admin actions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Admin Actions</p>
            <div className="space-y-2">
              <Btn variant="outline" size="xs" full icon={Mail}>Send email</Btn>
              <Btn variant="outline" size="xs" full icon={Lock}>Reset password</Btn>
              <Btn variant="outline" size="xs" full icon={Shield}>Force re-KYC</Btn>
              <Btn variant="outline" size="xs" full icon={Download}>Export data</Btn>
              <Btn variant="destructive" size="xs" full icon={Trash2}>Delete account</Btn>
            </div>
          </div>
        </div>

        {/* Centre + right — stats, reportages, transactions */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Balance",     value: `$${u.balance.toLocaleString("en",{minimumFractionDigits:2})}`, sub: "available" },
              { label: "Reportages",  value: u.reportages, sub: "submitted" },
              { label: "Total earned",value: `$${(u.balance + 1240).toLocaleString("en",{minimumFractionDigits:2})}`, sub: "all time" },
              { label: "Avg. price",  value: "$68.50", sub: "per reportage" },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-lg px-4 py-3">
                <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
                <p className="text-xl font-bold tabular-nums">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Recent reportages */}
          {u.role === "reporter" && recentReportages.length > 0 && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold">Recent Reportages</h3>
                <button className="text-xs text-primary hover:underline" onClick={() => onNavigate("admin-reportages")}>View all</button>
              </div>
              <div className="divide-y divide-border">
                {recentReportages.map(r => (
                  <div key={r.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 transition-colors">
                    <img src={r.img} alt={r.title} className="w-12 h-8 object-cover rounded flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{r.title}</p>
                      <p className="text-[10px] text-muted-foreground">{r.category} · {r.date}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-medium tabular-nums">${r.price}</span>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent transactions */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Recent Transactions</h3>
              <button className="text-xs text-primary hover:underline" onClick={() => onNavigate("admin-transactions")}>View all</button>
            </div>
            {recentTx.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground text-center">No transactions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[420px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <TH>ID</TH><TH>Type</TH><TH>Amount</TH><TH>Status</TH><TH>Date</TH>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTx.map(t => (
                      <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/20">
                        <TD><code className="text-[10px] font-mono text-muted-foreground">{t.id}</code></TD>
                        <TD><Chip color="gray">{t.type}</Chip></TD>
                        <TD mono>${t.amount.toFixed(2)}</TD>
                        <TD><StatusBadge status={t.status} /></TD>
                        <TD mono>{t.date}</TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">Internal Notes</h3>
            <textarea rows={4} placeholder="Add an internal note visible only to admins…"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <div className="flex justify-end mt-2">
              <Btn variant="outline" size="xs" icon={Send}>Save note</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Suspend confirmation */}
      {suspendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <Lock className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Suspend {u.name}?</p>
                <p className="text-xs text-muted-foreground">They will lose access immediately and be notified by email.</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Reason (shown to user)</label>
              <textarea rows={3} placeholder="e.g. Pending dispute resolution…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setSuspendOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={Lock} onClick={() => { setStatus("suspended"); setSuspendOpen(false); }}>Suspend account</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin User New / Edit ─────────────────────────────────────────────
function AdminUserEditScreen({ onNavigate, isNew }: { onNavigate: (s: Screen) => void; isNew?: boolean }) {
  const u = isNew ? null : USERS[0];

  const [name,     setName]     = useState(u?.name     ?? "");
  const [email,    setEmail]    = useState(u?.email    ?? "");
  const [phone,    setPhone]    = useState(u?.phone    ?? "");
  const [country,  setCountry]  = useState(u?.country  ?? "");
  const [role,     setRole]     = useState<UserRow["role"]>(u?.role ?? "customer");
  const [status,   setStatus]   = useState<UserStatus>(u?.status ?? "active");
  const [bio,      setBio]      = useState(u?.bio      ?? "");
  const [kycVerified, setKycVerified] = useState(u?.kycVerified ?? false);
  const [sendWelcome, setSendWelcome] = useState(isNew ?? false);
  const [saved, setSaved] = useState(false);

  const COUNTRIES = ["Italy","Kazakhstan","India","Japan","Ukraine","Senegal","Sweden","UAE","Germany","France","Brazil","USA","UK"];

  return (
    <Page
      title={isNew ? "New User" : "Edit User"}
      breadcrumbs={["Admin", "Users", isNew ? "New" : (u?.id ?? "Edit")]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs"
            onClick={() => onNavigate(isNew ? "admin-users" : "admin-user-detail")}>
            {isNew ? "Users" : "Profile"}
          </Btn>
          {!isNew && (
            <Btn variant="outline" icon={Eye} size="xs" onClick={() => onNavigate("admin-user-detail")}>View profile</Btn>
          )}
          <Btn variant="primary" icon={CheckCircle} size="sm" onClick={() => setSaved(true)}>
            {isNew ? "Create user" : "Save changes"}
          </Btn>
        </>
      }
    >
      {saved && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {isNew ? "User created successfully." : "Changes saved."}
          <button className="ml-auto text-emerald-500 hover:text-emerald-700" onClick={() => setSaved(false)}><XIcon className="w-3.5 h-3.5" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Identity */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold">Identity</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Full name <span className="text-red-500">*</span></label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Full name"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email <span className="text-red-500">*</span></label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="user@example.com" type="email"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Phone</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000"
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Country</label>
                <select value={country} onChange={e => setCountry(e.target.value)}
                  className="w-full px-2.5 py-2 text-sm bg-background border border-border rounded-md focus:outline-none">
                  <option value="">— select —</option>
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Bio / notes</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                placeholder="Short public bio or internal admin note…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
          </div>

          {/* Password (new user) / Reset (edit) */}
          <div className="bg-card border border-border rounded-lg p-5 space-y-4">
            <h3 className="text-sm font-semibold">{isNew ? "Password" : "Security"}</h3>
            {isNew ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Password <span className="text-red-500">*</span></label>
                  <input type="password" placeholder="Min. 8 characters"
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Confirm password</label>
                  <input type="password" placeholder="Repeat password"
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Password reset</p>
                  <p className="text-xs text-muted-foreground">Send a reset link to {email}.</p>
                </div>
                <Btn variant="outline" size="sm" icon={Lock}>Send reset link</Btn>
              </div>
            )}
          </div>

          {/* Role-specific */}
          {role === "reporter" && (
            <div className="bg-card border border-border rounded-lg p-5 space-y-3">
              <h3 className="text-sm font-semibold">Reporter Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1">Payout method</label>
                  <select className="w-full px-2.5 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none">
                    <option>Bank transfer</option><option>PayPal</option><option>Wise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Revenue share (%)</label>
                  <input type="number" defaultValue={90} min={0} max={100}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Featured reporter</p>
                  <p className="text-[10px] text-muted-foreground">Shown on the Reporters map homepage.</p>
                </div>
                <button className="w-9 h-5 bg-primary rounded-full relative flex-shrink-0">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Role & Status */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Account</p>
            <div>
              <label className="block text-xs font-medium mb-2">Role</label>
              <div className="space-y-2">
                {(["reporter","customer","admin"] as const).map(r => (
                  <label key={r} className={cn(
                    "flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors",
                    role === r ? "border-primary bg-primary/5" : "border-border hover:bg-secondary/40"
                  )}>
                    <input type="radio" name="role" checked={role === r} onChange={() => setRole(r)} className="accent-primary" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium capitalize">{r}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {r === "reporter" ? "Can submit and sell reportages" :
                         r === "customer" ? "Can browse and purchase reportages" :
                                            "Full platform admin access"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value as UserStatus)}
                className="w-full px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none capitalize">
                {(["active","pending","suspended","banned"] as const).map(s =>
                  <option key={s} value={s}>{s}</option>
                )}
              </select>
            </div>
          </div>

          {/* Verification flags */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Verification</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">KYC verified</span>
                <button onClick={() => setKycVerified(p => !p)}
                  className={cn("w-9 h-5 rounded-full relative flex-shrink-0 transition-colors", kycVerified ? "bg-primary" : "bg-secondary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all", kycVerified ? "right-0.5" : "left-0.5")} />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          {isNew && (
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">On Create</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Send welcome email</p>
                  <p className="text-[10px] text-muted-foreground">With login link and onboarding steps.</p>
                </div>
                <button onClick={() => setSendWelcome(p => !p)}
                  className={cn("w-9 h-5 rounded-full relative flex-shrink-0 transition-colors", sendWelcome ? "bg-primary" : "bg-secondary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all", sendWelcome ? "right-0.5" : "left-0.5")} />
                </button>
              </div>
            </div>
          )}

          {/* Danger zone (edit only) */}
          {!isNew && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600 mb-2">Danger Zone</p>
              <div className="space-y-2">
                <Btn variant="destructive" size="xs" full icon={Lock}>Suspend account</Btn>
                <Btn variant="destructive" size="xs" full icon={Trash2}>Delete account</Btn>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Reporters List ─────────────────────────────────────────────
function AdminReportersListScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const reporters = USERS.filter(u => u.role === "reporter");
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");
  const [kycFilter, setKycFilter]     = useState<"all" | "verified" | "unverified">("all");
  const [sort, setSort]               = useState<"name" | "reportages" | "balance" | "joined">("reportages");
  const [viewMode, setViewMode]       = useState<"table" | "cards">("cards");

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return reporters
      .filter(u =>
        (statusFilter === "all" || u.status === statusFilter) &&
        (kycFilter === "all" ||
          (kycFilter === "verified" && u.kycVerified) ||
          (kycFilter === "unverified" && !u.kycVerified)) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.country.toLowerCase().includes(q))
      )
      .sort((a, b) => {
        if (sort === "name")       return a.name.localeCompare(b.name);
        if (sort === "reportages") return b.reportages - a.reportages;
        if (sort === "balance")    return b.balance - a.balance;
        return b.joined.localeCompare(a.joined);
      });
  }, [search, statusFilter, kycFilter, sort, reporters]);

  const getProfile = (id: string) => REPORTER_PROFILES.find(p => p.userId === id);

  const STATUS_CLS: Record<UserStatus, string> = {
    active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
    pending:   "bg-amber-50 text-amber-700 border-amber-200",
    banned:    "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Page title="Reporters" breadcrumbs={["Admin", "People", "Reporters"]}
      actions={
        <div className="flex gap-1">
          <button onClick={() => setViewMode("cards")}
            className={cn("p-1.5 rounded border transition-colors", viewMode === "cards" ? "bg-card border-border text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
            <Grid className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setViewMode("table")}
            className={cn("p-1.5 rounded border transition-colors", viewMode === "table" ? "bg-card border-border text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      }
    >
      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <SearchInput value={search} onChange={setSearch} placeholder="Search name, email, country…" className="flex-1 min-w-[200px]" />
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","active","suspended","pending"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s as "all" | UserStatus)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                statusFilter === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{s}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","verified","unverified"] as const).map(k => (
            <button key={k} onClick={() => setKycFilter(k)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                kycFilter === k ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{k === "all" ? "All KYC" : k}</button>
          ))}
        </div>
        <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
          className="px-2.5 py-1.5 text-xs bg-background border border-border rounded-md focus:outline-none">
          <option value="reportages">Sort: most reportages</option>
          <option value="balance">Sort: highest balance</option>
          <option value="name">Sort: name A–Z</option>
          <option value="joined">Sort: newest first</option>
        </select>
      </div>

      {/* Cards view */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {rows.map(u => {
            const prof = getProfile(u.id);
            return (
              <div key={u.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onNavigate("admin-reporter-detail")}>
                {/* Cover strip */}
                <div className="h-16 bg-gradient-to-br from-secondary to-border relative">
                  {prof?.coverImg && (
                    <img src={prof.coverImg} alt="" className="w-full h-full object-cover opacity-60" />
                  )}
                  {prof?.featured && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 bg-amber-400 text-amber-900 rounded">FEATURED</span>
                  )}
                </div>
                {/* Avatar overlap */}
                <div className="px-4 pb-4">
                  <div className="-mt-6 mb-2 flex items-end justify-between">
                    <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-card" />
                    <div className="flex gap-1 mt-4">
                      {u.kycVerified && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">KYC</span>}
                      <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded border capitalize", STATUS_CLS[u.status])}>{u.status}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold leading-tight">{u.name}</p>
                  <p className="text-[10px] text-muted-foreground mb-2">{u.country}</p>
                  {prof && (
                    <div className="flex gap-1 flex-wrap mb-2">
                      {prof.categories.slice(0, 2).map(c => (
                        <span key={c} className="text-[9px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded font-medium">{c}</span>
                      ))}
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <p className="text-sm font-bold tabular-nums">{u.reportages}</p>
                      <p className="text-[9px] text-muted-foreground">reportages</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold tabular-nums">{prof?.rating ?? "—"}</p>
                      <p className="text-[9px] text-muted-foreground">rating</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold tabular-nums">${u.balance.toLocaleString("en",{maximumFractionDigits:0})}</p>
                      <p className="text-[9px] text-muted-foreground">balance</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {rows.length === 0 && (
            <p className="col-span-full text-center text-sm text-muted-foreground py-12">No reporters match your filter.</p>
          )}
        </div>
      )}

      {/* Table view */}
      {viewMode === "table" && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <TH>Reporter</TH>
                  <TH>Country</TH>
                  <TH>Categories</TH>
                  <TH sortable active={sort === "reportages"} onClick={() => setSort("reportages")}>Reportages</TH>
                  <TH>Rating</TH>
                  <TH sortable active={sort === "balance"} onClick={() => setSort("balance")}>Balance</TH>
                  <TH>KYC</TH>
                  <TH>Status</TH>
                  <TH></TH>
                </tr>
              </thead>
              <tbody>
                {rows.map(u => {
                  const prof = getProfile(u.id);
                  return (
                    <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <TD>
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium">{u.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{u.id}</p>
                          </div>
                        </div>
                      </TD>
                      <TD><span className="text-xs">{u.country}</span></TD>
                      <TD>
                        <div className="flex gap-1 flex-wrap">
                          {(prof?.categories ?? []).slice(0, 2).map(c => (
                            <span key={c} className="text-[9px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">{c}</span>
                          ))}
                        </div>
                      </TD>
                      <TD mono>{u.reportages}</TD>
                      <TD>
                        {prof ? (
                          <span className="text-xs font-medium">
                            {prof.rating} <span className="text-muted-foreground text-[10px]">({prof.reviewCount})</span>
                          </span>
                        ) : <span className="text-muted-foreground text-xs">—</span>}
                      </TD>
                      <TD mono>${u.balance.toLocaleString("en",{minimumFractionDigits:2})}</TD>
                      <TD>
                        {u.kycVerified
                          ? <CheckCircle className="w-4 h-4 text-emerald-500" />
                          : <XCircle className="w-4 h-4 text-red-400" />}
                      </TD>
                      <TD><StatusBadge status={u.status} /></TD>
                      <TD>
                        <div className="flex gap-1 justify-end">
                          <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate("admin-reporter-detail")} title="View"><Eye className="w-3.5 h-3.5" /></button>
                          <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                            onClick={() => onNavigate("admin-user-edit")} title="Edit"><Edit className="w-3.5 h-3.5" /></button>
                        </div>
                      </TD>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr><td colSpan={9} className="py-10 text-center text-sm text-muted-foreground">No reporters match your filter.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Reporter Detail ─────────────────────────────────────────────
function AdminReporterDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const u    = USERS.find(u => u.role === "reporter")!;
  const prof = REPORTER_PROFILES.find(p => p.userId === u.id)!;
  const reportages = REPORTAGES.filter(r => r.reporter === u.name);

  const [featured, setFeatured]     = useState(prof.featured);
  const [verified, setVerified]     = useState(prof.verified);
  const [featureOpen, setFeatureOpen] = useState(false);

  const soldCount    = reportages.filter(r => r.status === "delivered").length;
  const avgPrice     = reportages.length ? (reportages.reduce((s, r) => s + r.price, 0) / reportages.length).toFixed(0) : "—";
  const totalRevenue = reportages.filter(r => r.status === "delivered").reduce((s, r) => s + r.price, 0);

  const FORMAT_COLORS: Record<string, string> = {
    Video: "bg-primary/10 text-primary border-primary/20",
    Photo: "bg-sky-50 text-sky-700 border-sky-200",
    Audio: "bg-violet-50 text-violet-700 border-violet-200",
  };

  return (
    <Page title="Reporter Detail" breadcrumbs={["Admin", "People", "Reporters", u.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-reporters-list")}>Reporters</Btn>
          <Btn variant="outline" icon={Edit} size="xs" onClick={() => onNavigate("admin-user-edit")}>Edit account</Btn>
          {featured
            ? <Btn variant="outline" size="xs" icon={Star} onClick={() => setFeatured(false)}>Unfeature</Btn>
            : <Btn variant="primary"  size="xs" icon={Star} onClick={() => setFeatureOpen(true)}>Feature</Btn>
          }
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Left sidebar ── */}
        <div className="space-y-4">
          {/* Profile card */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="h-24 relative">
              <img src={prof.coverImg} alt="" className="w-full h-full object-cover" />
              {featured && (
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 bg-amber-400 text-amber-900 rounded-full">FEATURED</span>
              )}
            </div>
            <div className="px-4 pb-4">
              <div className="-mt-7 mb-2">
                <img src={u.avatar} alt={u.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-card" />
              </div>
              <div className="flex items-start justify-between mb-1">
                <h2 className="text-sm font-semibold leading-tight">{u.name}</h2>
                {verified && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded ml-2 flex-shrink-0">EDITORIAL</span>}
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">{u.email}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {u.kycVerified && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">KYC ✓</span>}
                <StatusBadge status={u.status} />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{u.bio}</p>
            </div>
          </div>

          {/* Details */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2.5 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Details</p>
            <div className="flex justify-between"><span className="text-muted-foreground">ID</span><code className="font-mono">{u.id}</code></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span>{u.country}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span className="font-mono">{u.joined}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Last login</span><span className="font-mono">{u.lastLogin}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Response time</span><span className="font-medium">{prof.responseTime}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rating</span>
              <span className="font-semibold">{prof.rating} <span className="text-muted-foreground font-normal">({prof.reviewCount} reviews)</span></span>
            </div>
          </div>

          {/* Languages + Equipment */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Languages</p>
              <div className="flex flex-wrap gap-1">
                {prof.languages.map(l => <span key={l} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded font-medium">{l}</span>)}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Equipment</p>
              <ul className="space-y-1">
                {prof.equipment.map(e => <li key={e} className="text-xs text-muted-foreground flex items-center gap-1.5"><Camera className="w-3 h-3 flex-shrink-0" />{e}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Categories</p>
              <div className="flex flex-wrap gap-1">
                {prof.categories.map(c => <Chip key={c} color="gray">{c}</Chip>)}
              </div>
            </div>
          </div>

          {/* Payout */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-2.5 text-xs">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Payout</p>
            <div className="flex justify-between"><span className="text-muted-foreground">Method</span><span>{prof.payoutMethod}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Account</span><code className="font-mono text-[10px] truncate max-w-[140px]">{prof.payoutAccount}</code></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Rev. share</span><span className="font-semibold">{prof.revenueShare}%</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Pending</span><span className="font-semibold text-amber-600">${prof.pendingPayout.toLocaleString("en",{minimumFractionDigits:2})}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total earned</span><span className="font-semibold">${prof.totalEarned.toLocaleString()}</span></div>
          </div>

          {/* Admin toggles */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Admin flags</p>
            {[
              { label: "Featured on map",     val: featured,  set: setFeatured },
              { label: "Editorial verified",  val: verified,  set: setVerified },
            ].map(({ label, val, set }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs font-medium">{label}</span>
                <button onClick={() => set((p: boolean) => !p)}
                  className={cn("w-9 h-5 rounded-full relative flex-shrink-0 transition-colors", val ? "bg-primary" : "bg-secondary")}>
                  <span className={cn("absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all", val ? "right-0.5" : "left-0.5")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Reportages",   value: u.reportages },
              { label: "Sold",         value: soldCount },
              { label: "Avg. price",   value: `$${avgPrice}` },
              { label: "Total revenue",value: `$${totalRevenue.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-lg px-4 py-3">
                <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
                <p className="text-xl font-bold tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Portfolio grid */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <h3 className="text-sm font-semibold">Portfolio</h3>
              <button className="text-xs text-primary hover:underline" onClick={() => onNavigate("admin-reportages")}>View all</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0.5 p-0.5">
              {reportages.slice(0, 8).map(r => (
                <div key={r.id} className="relative aspect-video group cursor-pointer overflow-hidden">
                  <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                    <div>
                      <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded border", FORMAT_COLORS[r.format])}>{r.format}</span>
                      <p className="text-white text-[10px] font-medium mt-1 line-clamp-2 leading-tight">{r.title}</p>
                    </div>
                  </div>
                  <span className={cn("absolute top-1.5 right-1.5 text-[8px] font-semibold px-1.5 py-0.5 rounded capitalize",
                    r.status === "delivered" ? "bg-emerald-500/90 text-white" :
                    r.status === "approved"  ? "bg-sky-500/90 text-white" :
                    r.status === "rejected"  ? "bg-red-500/90 text-white" :
                    "bg-black/50 text-white"
                  )}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent reportages table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Recent Reportages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <TH>Title</TH><TH>Category</TH><TH>Format</TH><TH>Price</TH><TH>Status</TH><TH>Date</TH>
                  </tr>
                </thead>
                <tbody>
                  {reportages.map(r => (
                    <tr key={r.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <TD><p className="text-xs font-medium truncate max-w-[180px]">{r.title}</p></TD>
                      <TD><Chip color="gray">{r.category}</Chip></TD>
                      <TD><span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", FORMAT_COLORS[r.format])}>{r.format}</span></TD>
                      <TD mono>${r.price}</TD>
                      <TD><StatusBadge status={r.status} /></TD>
                      <TD mono>{r.date}</TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Internal notes */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">Internal Notes</h3>
            <textarea rows={3} placeholder="Visible to admins only…"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <div className="flex justify-end mt-2">
              <Btn variant="outline" size="xs" icon={Send}>Save note</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Feature confirmation */}
      {featureOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Feature {u.name}?</p>
                <p className="text-xs text-muted-foreground">They will appear highlighted on the public Reporters map.</p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setFeatureOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={Star} onClick={() => { setFeatured(true); setFeatureOpen(false); }}>Feature reporter</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Subscriptions ──────────────────────────────────────────────
function AdminSubscriptionsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch]         = useState("");
  const [planFilter, setPlanFilter] = useState<"all" | "Pro" | "Enterprise">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | SubStatus>("all");
  const [cancelTarget, setCancelTarget] = useState<SubRow | null>(null);
  const [editPlan, setEditPlan]     = useState<typeof PLAN_DEFS[0] | null>(null);
  const [tab, setTab]               = useState<"subscribers" | "plans">("subscribers");

  const STATUS_META: Record<SubStatus, { label: string; cls: string }> = {
    active:    { label: "Active",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    trialing:  { label: "Trialing",  cls: "bg-sky-50 text-sky-700 border-sky-200" },
    past_due:  { label: "Past due",  cls: "bg-red-50 text-red-700 border-red-200" },
    paused:    { label: "Paused",    cls: "bg-amber-50 text-amber-700 border-amber-200" },
    cancelled: { label: "Cancelled", cls: "bg-secondary text-muted-foreground border-border" },
  };

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    return SUBSCRIPTIONS.filter(s =>
      (planFilter === "all" || s.plan === planFilter) &&
      (statusFilter === "all" || s.status === statusFilter) &&
      (!q || s.userName.toLowerCase().includes(q) || s.userEmail.toLowerCase().includes(q))
    );
  }, [search, planFilter, statusFilter]);

  const active = SUBSCRIPTIONS.filter(s => s.status === "active" || s.status === "trialing");
  const mrr = active.reduce((sum, s) => sum + (s.billing === "monthly" ? s.amount : s.amount / 12), 0);
  const arr = mrr * 12;
  const proCount        = active.filter(s => s.plan === "Pro").length;
  const enterpriseCount = active.filter(s => s.plan === "Enterprise").length;
  const churn = SUBSCRIPTIONS.filter(s => s.status === "cancelled").length;

  return (
    <Page title="Subscriptions" breadcrumbs={["Admin", "People", "Subscriptions"]}>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "MRR",          value: `$${Math.round(mrr).toLocaleString()}`,   sub: "monthly recurring" },
          { label: "ARR",          value: `$${Math.round(arr).toLocaleString()}`,   sub: "annualised" },
          { label: "Active subs",  value: active.length,                            sub: `${proCount} Pro · ${enterpriseCount} Enterprise` },
          { label: "Churned",      value: churn,                                    sub: "all time cancellations" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg px-4 py-3">
            <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
            <p className="text-xl font-bold tabular-nums">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* MRR sparkline */}
      <div className="bg-card border border-border rounded-lg p-4 mb-4">
        <p className="text-xs font-semibold mb-3">MRR Growth</p>
        <ResponsiveContainer width="100%" height={80}>
          <AreaChart id="ch-sub-mrr" data={SUB_MRR_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop key="s0" offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop key="s1" offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => [`$${v}`, "MRR"]} contentStyle={{ fontSize: 11 }} />
            <Area key="mrr" type="monotone" dataKey="mrr" stroke="hsl(var(--primary))" fill="url(#mrrGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5 mb-4 w-fit">
        {(["subscribers","plans"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn("px-4 py-1.5 text-xs font-medium rounded capitalize transition-all",
              tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}>{t}</button>
        ))}
      </div>

      {tab === "subscribers" && (
        <>
          {/* Filters */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <SearchInput value={search} onChange={setSearch} placeholder="Search name or email…" className="flex-1 min-w-[200px]" />
            <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
              {(["all","Pro","Enterprise"] as const).map(p => (
                <button key={p} onClick={() => setPlanFilter(p)}
                  className={cn("px-3 py-1 text-xs font-medium rounded transition-all",
                    planFilter === p ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}>{p === "all" ? "All plans" : p}</button>
              ))}
            </div>
            <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
              {(["all","active","trialing","past_due","paused","cancelled"] as const).map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                    statusFilter === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}>{s === "all" ? "All" : STATUS_META[s].label}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <TH>Subscriber</TH>
                    <TH>Plan</TH>
                    <TH>Billing</TH>
                    <TH>Amount</TH>
                    <TH>Status</TH>
                    <TH>Renews / Ends</TH>
                    <TH>Payment</TH>
                    <TH></TH>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 && (
                    <tr><td colSpan={8} className="py-10 text-center text-sm text-muted-foreground">No subscriptions match your filter.</td></tr>
                  )}
                  {rows.map(s => (
                    <tr key={s.id} className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                      <TD>
                        <div className="flex items-center gap-2">
                          <img src={s.userAvatar} alt={s.userName} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{s.userName}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{s.userEmail}</p>
                          </div>
                        </div>
                      </TD>
                      <TD>
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border",
                          s.plan === "Enterprise" ? "bg-violet-50 text-violet-700 border-violet-200" : "bg-primary/10 text-primary border-primary/20"
                        )}>{s.plan}</span>
                      </TD>
                      <TD><span className="text-xs capitalize">{s.billing}</span></TD>
                      <TD><span className="text-xs font-medium tabular-nums">${s.amount}/yr</span></TD>
                      <TD>
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", STATUS_META[s.status].cls)}>
                          {STATUS_META[s.status].label}
                        </span>
                      </TD>
                      <TD>
                        <span className="font-mono text-xs text-muted-foreground">
                          {s.cancelledAt ? `Ended ${s.cancelledAt}` : s.renewsAt ?? "—"}
                        </span>
                      </TD>
                      <TD><span className="text-xs text-muted-foreground">{s.paymentMethod}</span></TD>
                      <TD>
                        <div className="flex gap-1 justify-end">
                          <button className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => onNavigate("admin-user-detail")} title="View user">
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {s.status !== "cancelled" && (
                            <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                              onClick={() => setCancelTarget(s)} title="Cancel">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </TD>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{rows.length} of {SUBSCRIPTIONS.length} subscriptions</span>
              <span className="text-xs text-muted-foreground">
                Total active MRR: <strong className="text-foreground">${Math.round(mrr).toLocaleString()}</strong>
              </span>
            </div>
          </div>
        </>
      )}

      {tab === "plans" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLAN_DEFS.map(p => (
            <div key={p.id} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border",
                    p.id === "enterprise" ? "bg-violet-50 text-violet-700 border-violet-200" : "bg-primary/10 text-primary border-primary/20"
                  )}>{p.name}</span>
                  <p className="text-lg font-bold mt-2 tabular-nums">${p.monthlyPrice}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-xs text-muted-foreground">${p.annualPrice}/yr · saves ${(p.monthlyPrice * 12 - p.annualPrice)} annually</p>
                </div>
                <Btn variant="outline" size="xs" icon={Edit} onClick={() => setEditPlan(p)}>Edit</Btn>
              </div>
              <div className="h-px bg-border mb-3" />
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Features</p>
              <ul className="space-y-1.5">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-border flex gap-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Active</p>
                  <p className="font-semibold tabular-nums">{active.filter(s => s.plan === p.name).length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Seats</p>
                  <p className="font-semibold">{p.seats === 1 ? "1 user" : `Up to ${p.seats}`}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">MRR contrib.</p>
                  <p className="font-semibold tabular-nums">
                    ${Math.round(active.filter(s => s.plan === p.name).reduce((sum, s) => sum + (s.billing === "monthly" ? s.amount : s.amount / 12), 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel confirmation modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Cancel subscription?</p>
                <p className="text-xs text-muted-foreground">{cancelTarget.userName} · {cancelTarget.plan} {cancelTarget.billing}</p>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 text-xs space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="font-medium">${cancelTarget.amount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Current period ends</span><span className="font-mono">{cancelTarget.renewsAt}</span></div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Cancel timing</label>
              <select className="w-full px-2.5 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none">
                <option>At end of billing period</option>
                <option>Immediately (no refund)</option>
                <option>Immediately + prorate refund</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Reason (internal)</label>
              <textarea rows={2} placeholder="Optional note…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setCancelTarget(null)}>Keep subscription</Btn>
              <Btn variant="destructive" size="sm" icon={XCircle} onClick={() => setCancelTarget(null)}>Confirm cancel</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Edit plan modal */}
      {editPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Edit {editPlan.name} plan</h3>
              <button onClick={() => setEditPlan(null)} className="text-muted-foreground hover:text-foreground"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1">Monthly price (USD)</label>
                <input type="number" defaultValue={editPlan.monthlyPrice}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Annual price (USD)</label>
                <input type="number" defaultValue={editPlan.annualPrice}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Team seats</label>
                <input type="number" defaultValue={editPlan.seats}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Trial days</label>
                <input type="number" defaultValue={14}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Features (one per line)</label>
              <textarea rows={4} defaultValue={editPlan.features.join("\n")}
                className="w-full px-3 py-2 text-xs bg-background border border-border rounded-md font-mono focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setEditPlan(null)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={CheckCircle} onClick={() => setEditPlan(null)}>Save plan</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Devices ─────────────────────────────────────────────────────
function AdminDevicesScreen() {
  const [search, setSearch]             = useState("");
  const [typeFilter, setTypeFilter]     = useState<"all" | DeviceType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | DeviceStatus>("all");
  const [groupByUser, setGroupByUser]   = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<DeviceRow | null>(null);
  const [revokeAllUser, setRevokeAllUser] = useState<string | null>(null);

  const TYPE_ICON: Record<DeviceType, React.ReactNode> = {
    desktop: <Monitor className="w-3.5 h-3.5" />,
    mobile:  <Smartphone className="w-3.5 h-3.5" />,
    tablet:  <Tablet className="w-3.5 h-3.5" />,
  };
  const STATUS_META: Record<DeviceStatus, { cls: string; label: string }> = {
    active:     { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Active" },
    revoked:    { cls: "bg-secondary text-muted-foreground border-border",  label: "Revoked" },
    suspicious: { cls: "bg-red-50 text-red-700 border-red-200",            label: "Suspicious" },
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return DEVICES.filter(d =>
      (typeFilter === "all" || d.type === typeFilter) &&
      (statusFilter === "all" || d.status === statusFilter) &&
      (!q || d.userName.toLowerCase().includes(q) || d.ip.includes(q) || d.location.toLowerCase().includes(q) || d.browser.toLowerCase().includes(q) || d.os.toLowerCase().includes(q))
    );
  }, [search, typeFilter, statusFilter]);

  // group by user for grouped view
  const byUser = useMemo(() => {
    const map = new Map<string, { user: DeviceRow; devices: DeviceRow[] }>();
    filtered.forEach(d => {
      if (!map.has(d.userId)) map.set(d.userId, { user: d, devices: [] });
      map.get(d.userId)!.devices.push(d);
    });
    return Array.from(map.values());
  }, [filtered]);

  const stats = {
    total:      DEVICES.length,
    active:     DEVICES.filter(d => d.status === "active").length,
    suspicious: DEVICES.filter(d => d.status === "suspicious").length,
    desktop:    DEVICES.filter(d => d.type === "desktop").length,
    mobile:     DEVICES.filter(d => d.type === "mobile").length,
    tablet:     DEVICES.filter(d => d.type === "tablet").length,
  };

  const DeviceRow_ = ({ d }: { d: DeviceRow }) => (
    <tr className={cn("border-b border-border last:border-0 hover:bg-secondary/20 transition-colors",
      d.status === "suspicious" && "bg-red-50/40"
    )}>
      <TD>
        <div className="flex items-center gap-2">
          <img src={d.userAvatar} alt={d.userName} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-medium truncate">{d.userName}</p>
            <p className="text-[10px] text-muted-foreground font-mono">{d.userId}</p>
          </div>
        </div>
      </TD>
      <TD>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">{TYPE_ICON[d.type]}</span>
          <span className="text-xs capitalize">{d.type}</span>
        </div>
      </TD>
      <TD><span className="text-xs">{d.os}</span></TD>
      <TD><span className="text-xs">{d.browser}</span></TD>
      <TD><code className="text-[10px] font-mono text-muted-foreground">{d.ip}</code></TD>
      <TD><span className="text-xs">{d.location}</span></TD>
      <TD><span className="font-mono text-[10px] text-muted-foreground">{d.lastActive}</span></TD>
      <TD>
        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", STATUS_META[d.status].cls)}>
          {STATUS_META[d.status].label}
        </span>
      </TD>
      <TD>
        <div className="flex gap-1 justify-end">
          {d.status === "active" && (
            <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
              title="Revoke session" onClick={() => setRevokeTarget(d)}>
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
          {d.status === "suspicious" && (
            <button className="p-1 rounded hover:bg-amber-50 text-muted-foreground hover:text-amber-600 transition-colors"
              title="Flag as suspicious">
              <AlertTriangle className="w-3.5 h-3.5" />
            </button>
          )}
          {d.status === "revoked" && (
            <span className="text-[10px] text-muted-foreground px-2">revoked</span>
          )}
        </div>
      </TD>
    </tr>
  );

  return (
    <Page title="Devices" breadcrumbs={["Admin", "People", "Devices"]}>
      {/* Stats */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
        {[
          { label: "Total",       value: stats.total,       cls: "" },
          { label: "Active",      value: stats.active,      cls: "text-emerald-600" },
          { label: "Suspicious",  value: stats.suspicious,  cls: stats.suspicious > 0 ? "text-red-600" : "" },
          { label: "Desktop",     value: stats.desktop,     cls: "" },
          { label: "Mobile",      value: stats.mobile,      cls: "" },
          { label: "Tablet",      value: stats.tablet,      cls: "" },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-lg px-3 py-2.5 text-center">
            <p className={cn("text-xl font-bold tabular-nums", s.cls)}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Suspicious banner */}
      {stats.suspicious > 0 && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700 font-medium flex-1">
            {stats.suspicious} suspicious device{stats.suspicious > 1 ? "s" : ""} detected — review and revoke if necessary.
          </p>
          <button onClick={() => setStatusFilter("suspicious")}
            className="text-xs text-red-600 font-semibold hover:underline whitespace-nowrap">Show only</button>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-4 flex-wrap items-center">
        <SearchInput value={search} onChange={setSearch} placeholder="Search user, IP, location, browser…" className="flex-1 min-w-[200px]" />
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","desktop","mobile","tablet"] as const).map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                typeFilter === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{t === "all" ? "All types" : t}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-md p-0.5">
          {(["all","active","suspicious","revoked"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s as "all" | DeviceStatus)}
              className={cn("px-3 py-1 text-xs font-medium rounded capitalize transition-all",
                statusFilter === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}>{s === "all" ? "All statuses" : s}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer select-none">
          <button onClick={() => setGroupByUser(p => !p)}
            className={cn("w-8 h-4 rounded-full relative flex-shrink-0 transition-colors", groupByUser ? "bg-primary" : "bg-secondary")}>
            <span className={cn("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all", groupByUser ? "right-0.5" : "left-0.5")} />
          </button>
          Group by user
        </label>
      </div>

      {/* Flat table */}
      {!groupByUser && (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px]">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <TH>User</TH>
                  <TH>Type</TH>
                  <TH>OS</TH>
                  <TH>Browser / App</TH>
                  <TH>IP address</TH>
                  <TH>Location</TH>
                  <TH>Last active</TH>
                  <TH>Status</TH>
                  <TH></TH>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={9} className="py-10 text-center text-sm text-muted-foreground">No devices match your filter.</td></tr>
                )}
                {filtered.map(d => <DeviceRow_ key={d.id} d={d} />)}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-border">
            <span className="text-xs text-muted-foreground">{filtered.length} of {DEVICES.length} devices</span>
          </div>
        </div>
      )}

      {/* Grouped by user */}
      {groupByUser && (
        <div className="space-y-3">
          {byUser.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-10">No devices match your filter.</p>
          )}
          {byUser.map(({ user: u, devices }) => (
            <div key={u.userId} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* User header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-secondary/20">
                <img src={u.userAvatar} alt={u.userName} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{u.userName}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{u.userId} · {u.userRole}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{devices.length} device{devices.length > 1 ? "s" : ""}</span>
                  {devices.some(d => d.status === "active") && (
                    <button onClick={() => setRevokeAllUser(u.userId)}
                      className="text-xs text-red-600 font-medium hover:underline whitespace-nowrap">Revoke all</button>
                  )}
                </div>
              </div>
              {/* Device rows */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/10">
                      <TH>Type</TH>
                      <TH>OS</TH>
                      <TH>Browser / App</TH>
                      <TH>IP address</TH>
                      <TH>Location</TH>
                      <TH>Last active</TH>
                      <TH>Status</TH>
                      <TH></TH>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map(d => (
                      <tr key={d.id} className={cn("border-b border-border last:border-0 hover:bg-secondary/20 transition-colors",
                        d.status === "suspicious" && "bg-red-50/40"
                      )}>
                        <TD>
                          <div className="flex items-center gap-1.5">
                            <span className="text-muted-foreground">{TYPE_ICON[d.type]}</span>
                            <span className="text-xs capitalize">{d.type}</span>
                          </div>
                        </TD>
                        <TD><span className="text-xs">{d.os}</span></TD>
                        <TD><span className="text-xs">{d.browser}</span></TD>
                        <TD><code className="text-[10px] font-mono text-muted-foreground">{d.ip}</code></TD>
                        <TD><span className="text-xs">{d.location}</span></TD>
                        <TD><span className="font-mono text-[10px] text-muted-foreground">{d.lastActive}</span></TD>
                        <TD>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", STATUS_META[d.status].cls)}>
                            {STATUS_META[d.status].label}
                          </span>
                        </TD>
                        <TD>
                          {d.status === "active" && (
                            <button className="p-1 rounded hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                              title="Revoke" onClick={() => setRevokeTarget(d)}>
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {d.status === "suspicious" && (
                            <AlertTriangle className="w-3.5 h-3.5 text-red-500 mx-1" />
                          )}
                        </TD>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Revoke single session modal */}
      {revokeTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Revoke session?</p>
                <p className="text-xs text-muted-foreground">{revokeTarget.userName} · {revokeTarget.browser} on {revokeTarget.os}</p>
              </div>
            </div>
            <div className="bg-secondary/50 rounded-lg px-3 py-2.5 text-xs space-y-1">
              <div className="flex justify-between"><span className="text-muted-foreground">IP</span><code className="font-mono">{revokeTarget.ip}</code></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span>{revokeTarget.location}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Last active</span><span className="font-mono">{revokeTarget.lastActive}</span></div>
            </div>
            <p className="text-xs text-muted-foreground">The user will be signed out from this device immediately and will need to log in again.</p>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setRevokeTarget(null)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={XCircle} onClick={() => setRevokeTarget(null)}>Revoke session</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Revoke all for user modal */}
      {revokeAllUser && (() => {
        const name = DEVICES.find(d => d.userId === revokeAllUser)?.userName ?? revokeAllUser;
        const count = DEVICES.filter(d => d.userId === revokeAllUser && d.status === "active").length;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Revoke all sessions?</p>
                  <p className="text-xs text-muted-foreground">{name} — {count} active session{count > 1 ? "s" : ""}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">This will sign the user out of all devices immediately. They will need to log in again on each device.</p>
              <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <p className="text-xs text-amber-700">Consider sending the user an email notification.</p>
              </div>
              <div className="flex gap-2 justify-end">
                <Btn variant="outline" size="sm" onClick={() => setRevokeAllUser(null)}>Cancel</Btn>
                <Btn variant="destructive" size="sm" icon={XCircle} onClick={() => setRevokeAllUser(null)}>Revoke all</Btn>
              </div>
            </div>
          </div>
        );
      })()}
    </Page>
  );
}

// ── SCREEN: Admin Reportage Detail ───────────────────────────────────────────
function AdminReportageDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const r = REPORTAGES.find(r => r.id === "RPT-2238")!; // Dakar Port Workers Strike — "reviewing"
  const reporter = USERS.find(u => u.name === r.reporter);
  const delivery = DELIVERIES.find(d => d.reportage === r.title);

  const [status, setStatus]     = useState<ReportageStatus>(r.status);
  const [price, setPrice]       = useState(r.price);
  const [editPrice, setEditPrice] = useState(false);
  const [reviewNote, setReviewNote] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [changesOpen, setChangesOpen]   = useState(false);
  const [changesNote, setChangesNote]   = useState("");

  const FEE_PCT = 10;
  const reporterEarns = price * (1 - FEE_PCT / 100);
  const platformEarns = price * (FEE_PCT / 100);

  const FORMAT_CLS: Record<string, string> = {
    Video: "bg-primary/10 text-primary border-primary/20",
    Photo: "bg-sky-50 text-sky-700 border-sky-200",
    Audio: "bg-violet-50 text-violet-700 border-violet-200",
  };

  const TIMELINE: { label: string; done: boolean; date?: string }[] = [
    { label: "Draft created",     done: true,  date: r.date },
    { label: "Submitted",         done: true,  date: r.date },
    { label: "Under review",      done: status !== "draft" && status !== "submitted", date: "2026-05-18" },
    { label: "Approved",          done: status === "approved" || status === "delivered" },
    { label: "Purchased",         done: status === "delivered", date: r.buyer ? "2026-05-22" : undefined },
    { label: "Delivered",         done: status === "delivered" },
  ];

  const relatedReportages = REPORTAGES.filter(x => x.id !== r.id && (x.reporter === r.reporter || x.category === r.category)).slice(0, 3);

  const AV_CLS: Record<AvScan, string> = {
    clean:    "bg-emerald-50 text-emerald-700 border-emerald-200",
    scanning: "bg-amber-50 text-amber-700 border-amber-200",
    infected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <Page
      title="Reportage Detail"
      breadcrumbs={["Admin", "Content", "Reportages", r.id]}
      actions={
        <>
          <Btn variant="ghost" icon={ChevronLeft} size="xs" onClick={() => onNavigate("admin-reportages")}>Reportages</Btn>
          {status === "reviewing" && (
            <>
              <Btn variant="outline" size="xs" icon={RefreshCw} onClick={() => setChangesOpen(true)}>Request changes</Btn>
              <Btn variant="destructive" size="xs" icon={XCircle} onClick={() => setRejectOpen(true)}>Reject</Btn>
              <Btn variant="primary" size="xs" icon={CheckCircle} onClick={() => setStatus("approved")}>Approve</Btn>
            </>
          )}
          {status === "submitted" && (
            <Btn variant="primary" size="xs" icon={Eye} onClick={() => setStatus("reviewing")}>Start review</Btn>
          )}
          {(status === "approved" || status === "delivered") && (
            <Btn variant="outline" size="xs" icon={XCircle} onClick={() => setStatus("rejected")}>Retract approval</Btn>
          )}
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Main column ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Cover + status banner */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="relative">
              <img src={r.img} alt={r.title} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border", FORMAT_CLS[r.format])}>{r.format}</span>
                  <Chip color="gray">{r.category}</Chip>
                </div>
                <h1 className="text-white text-lg font-semibold leading-snug">{r.title}</h1>
              </div>
              {/* Play overlay for video */}
              {r.format === "Video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
                  </button>
                </div>
              )}
            </div>

            {/* Status bar */}
            <div className={cn("flex items-center gap-3 px-4 py-3 border-b border-border",
              status === "reviewing"  ? "bg-amber-50"  :
              status === "approved"   ? "bg-emerald-50" :
              status === "rejected"   ? "bg-red-50"    :
              status === "delivered"  ? "bg-sky-50"    :
              "bg-secondary/20"
            )}>
              <StatusBadge status={status} />
              <span className="text-xs text-muted-foreground flex-1">
                {status === "reviewing"  ? "This reportage is currently under editorial review." :
                 status === "submitted"  ? "Awaiting assignment to a reviewer." :
                 status === "approved"   ? "Approved and visible in the marketplace." :
                 status === "rejected"   ? "Rejected — reporter has been notified." :
                 status === "delivered"  ? `Purchased by ${r.buyer} and delivered.` :
                 "Draft — not yet submitted."}
              </span>
              <code className="text-[10px] font-mono text-muted-foreground">{r.id}</code>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y divide-border border-b border-border">
              {[
                { label: "Duration",  value: r.duration },
                { label: "Format",    value: r.format },
                { label: "Submitted", value: r.date },
                { label: "Category",  value: r.category },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3">
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">Description</p>
              <p className="text-sm text-foreground leading-relaxed">
                Workers at the Port of Dakar entered their third day of strike action over unpaid wages and unsafe working conditions. This reportage documents picketing at the main cargo gate, confrontations with port security, and interviews with union representatives. Footage includes crowd scenes, signage, and a short statement from the dock workers' union president.
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {["labor","strike","Dakar","West Africa","union","port"].map(tag => (
                  <span key={tag} className="text-[10px] bg-secondary text-muted-foreground px-2 py-0.5 rounded font-mono">#{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* File details */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">File Details</h3>
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground mb-0.5">Files</p>
                <p className="font-semibold">{delivery?.files ?? 2} files</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Total size</p>
                <p className="font-semibold">{delivery?.size ?? "840 MB"}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">AV scan</p>
                {delivery ? (
                  <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border capitalize", AV_CLS[delivery.avScan])}>{delivery.avScan}</span>
                ) : (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">pending</span>
                )}
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Checksum</p>
                <code className="font-mono text-[10px] text-muted-foreground">{delivery?.checksum ?? "sha256:c4e1a2…"}</code>
              </div>
            </div>
            <div className="px-4 pb-4 flex gap-2">
              <Btn variant="outline" icon={Download} size="xs">Download originals</Btn>
              <Btn variant="outline" icon={Shield} size="xs">Re-run AV scan</Btn>
            </div>
          </div>

          {/* Review notes */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-sm font-semibold mb-3">Review Notes</h3>
            <div className="space-y-3 mb-3">
              {[
                { author: "AutoCheck", time: "2026-05-18 09:01", note: "Metadata integrity OK. GPS coordinates embedded. Duration matches declared 4:08.", system: true },
                { author: "Admin",     time: "2026-05-18 09:05", note: "Assigned to editorial queue. Priority: normal.", system: false },
              ].map((n, i) => (
                <div key={i} className={cn("rounded-lg px-3 py-2.5 text-xs", n.system ? "bg-secondary/50" : "bg-card border border-border")}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{n.author}</span>
                    <span className="text-muted-foreground font-mono">{n.time}</span>
                    {n.system && <span className="text-[9px] font-bold px-1.5 py-0.5 bg-secondary text-muted-foreground rounded">SYSTEM</span>}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{n.note}</p>
                </div>
              ))}
            </div>
            <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
              rows={3} placeholder="Add an internal review note…"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            <div className="flex justify-end mt-2">
              <Btn variant="outline" size="xs" icon={Send} onClick={() => setReviewNote("")}>Post note</Btn>
            </div>
          </div>

          {/* Related reportages */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold">Related Reportages</h3>
            </div>
            <div className="divide-y divide-border">
              {relatedReportages.map(rel => (
                <div key={rel.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/20 cursor-pointer transition-colors"
                  onClick={() => onNavigate("admin-reportage-detail")}>
                  <img src={rel.img} alt={rel.title} className="w-14 h-9 object-cover rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{rel.title}</p>
                    <p className="text-[10px] text-muted-foreground">{rel.reporter} · {rel.category} · {rel.date}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium tabular-nums">${rel.price}</span>
                    <StatusBadge status={rel.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-4">
          {/* Reporter */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Reporter</p>
            <div className="flex items-center gap-3 mb-3">
              {reporter ? (
                <img src={reporter.avatar} alt={reporter.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <Avatar name={r.reporter} size="md" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold">{r.reporter}</p>
                <p className="text-[10px] text-muted-foreground">{reporter?.country ?? "—"}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs mb-3">
              <div className="flex justify-between"><span className="text-muted-foreground">Reportages</span><span className="font-medium">{reporter?.reportages ?? "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">KYC</span>
                {reporter?.kycVerified
                  ? <span className="text-emerald-600 font-medium">Verified</span>
                  : <span className="text-red-500 font-medium">Unverified</span>}
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><StatusBadge status={reporter?.status ?? "active"} /></div>
            </div>
            <Btn variant="outline" icon={Eye} size="xs" full onClick={() => onNavigate("admin-reporter-detail")}>View reporter</Btn>
          </div>

          {/* Pricing */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Pricing</p>
            {editPrice ? (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Listed price (USD)</label>
                  <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none" />
                </div>
                <div className="flex gap-2">
                  <Btn variant="primary" size="xs" icon={CheckCircle} full onClick={() => setEditPrice(false)}>Save</Btn>
                  <Btn variant="ghost" size="xs" full onClick={() => { setPrice(r.price); setEditPrice(false); }}>Cancel</Btn>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Listed price</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tabular-nums">${price}</span>
                    <button onClick={() => setEditPrice(true)} className="text-primary hover:underline text-[10px]">edit</button>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-muted-foreground">Platform fee ({FEE_PCT}%)</span><span className="font-mono">−${platformEarns.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Reporter earns</span><span className="font-semibold text-emerald-600">${reporterEarns.toFixed(2)}</span></div>
              </div>
            )}
          </div>

          {/* Buyer */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Buyer</p>
            {r.buyer ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <Avatar name={r.buyer} size="md" />
                  <div>
                    <p className="text-sm font-semibold">{r.buyer}</p>
                    <p className="text-[10px] text-muted-foreground">Purchased 2026-05-22</p>
                  </div>
                </div>
                <Btn variant="outline" icon={Eye} size="xs" full onClick={() => onNavigate("admin-user-detail")}>View buyer</Btn>
              </>
            ) : (
              <p className="text-xs text-muted-foreground">Not yet purchased.</p>
            )}
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Timeline</p>
            <ol className="space-y-3">
              {TIMELINE.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    step.done ? "bg-primary" : "bg-secondary border-2 border-border"
                  )}>
                    {step.done && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-xs font-medium", !step.done && "text-muted-foreground")}>{step.label}</p>
                    {step.date && <p className="text-[10px] font-mono text-muted-foreground">{step.date}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Admin actions */}
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Admin Actions</p>
            <div className="space-y-2">
              <Btn variant="outline" icon={Copy}        size="xs" full>Duplicate listing</Btn>
              <Btn variant="outline" icon={ExternalLink} size="xs" full>View public listing</Btn>
              <Btn variant="outline" icon={Download}    size="xs" full>Download files</Btn>
              <Btn variant="destructive" icon={Trash2}  size="xs" full>Delete reportage</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* Reject modal */}
      {rejectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Reject reportage?</p>
                <p className="text-xs text-muted-foreground">{r.reporter} will be notified by email.</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Reason for rejection <span className="text-red-500">*</span></label>
              <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={4}
                placeholder="Explain clearly what does not meet editorial standards…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setRejectOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={XCircle} onClick={() => { setStatus("rejected"); setRejectOpen(false); }}>Reject</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Request changes modal */}
      {changesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Request changes</p>
                <p className="text-xs text-muted-foreground">Reporter will be asked to revise and resubmit.</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">What needs to change? <span className="text-red-500">*</span></label>
              <textarea value={changesNote} onChange={e => setChangesNote(e.target.value)} rows={4}
                placeholder="e.g. Audio levels are too low in the first 30 seconds. Please re-export with normalised audio."
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setChangesOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={RefreshCw} onClick={() => { setStatus("submitted"); setChangesOpen(false); }}>Send request</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Requests List ───────────────────────────────────────────────
function AdminRequestsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminRequestStatus>("all");
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [sortKey, setSortKey] = useState<"budget" | "deadline" | "responseCount" | "createdAt">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const PER_PAGE = 7;

  const counts = useMemo(() => ({
    open:      ADMIN_REQUESTS.filter(r => r.status === "open").length,
    assigned:  ADMIN_REQUESTS.filter(r => r.status === "assigned").length,
    fulfilled: ADMIN_REQUESTS.filter(r => r.status === "fulfilled").length,
    expired:   ADMIN_REQUESTS.filter(r => r.status === "expired").length,
    closed:    ADMIN_REQUESTS.filter(r => r.status === "closed").length,
  }), []);

  const filtered = useMemo(() => {
    let list = [...ADMIN_REQUESTS];
    if (statusFilter !== "all") list = list.filter(r => r.status === statusFilter);
    if (urgentOnly) list = list.filter(r => r.urgent);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.buyer.toLowerCase().includes(q) ||
        r.buyerOrg.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      let av: number | string, bv: number | string;
      if (sortKey === "budget")        { av = a.budget;        bv = b.budget; }
      else if (sortKey === "deadline") { av = a.deadline;      bv = b.deadline; }
      else if (sortKey === "responseCount") { av = a.responseCount; bv = b.responseCount; }
      else                             { av = a.createdAt;     bv = b.createdAt; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, statusFilter, urgentOnly, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const SH = ({ col, label }: { col: typeof sortKey; label: string }) => (
    <button onClick={() => toggleSort(col)}
      className="flex items-center gap-1 hover:text-foreground transition-colors">
      {label}
      {sortKey === col
        ? (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)
        : <ChevronsUpDown className="w-3 h-3 opacity-40" />}
    </button>
  );

  const statusColor: Record<AdminRequestStatus, string> = {
    open:      "bg-sky-100 text-sky-700",
    assigned:  "bg-amber-100 text-amber-700",
    fulfilled: "bg-emerald-100 text-emerald-700",
    expired:   "bg-red-100 text-red-600",
    closed:    "bg-zinc-100 text-zinc-500",
  };

  const formatColor: Record<string, string> = {
    Video: "bg-purple-100 text-purple-700",
    Photo: "bg-blue-100 text-blue-700",
    Audio: "bg-orange-100 text-orange-700",
    Any:   "bg-zinc-100 text-zinc-600",
  };

  return (
    <Page title="Reportage Requests" breadcrumbs={["Admin", "Content", "Requests"]}>
      {/* Stats bar */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {(["open","assigned","fulfilled","expired","closed"] as AdminRequestStatus[]).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s === statusFilter ? "all" : s); setPage(1); }}
            className={cn("bg-card border rounded-lg p-3 text-left transition-all",
              statusFilter === s ? "border-primary ring-1 ring-primary" : "border-border hover:border-primary/40")}>
            <div className="text-xl font-bold text-foreground">{counts[s]}</div>
            <div className="text-xs text-muted-foreground capitalize mt-0.5">{s}</div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by title, buyer, location…" className="w-64" />
        <button onClick={() => { setUrgentOnly(u => !u); setPage(1); }}
          className={cn("flex items-center gap-1.5 px-3 h-8 rounded-md border text-xs font-medium transition-colors",
            urgentOnly ? "bg-red-50 border-red-300 text-red-700" : "border-border text-muted-foreground hover:text-foreground")}>
          <Zap className="w-3.5 h-3.5" /> Urgent only
        </button>
        {statusFilter !== "all" && (
          <button onClick={() => setStatusFilter("all")}
            className="flex items-center gap-1 px-3 h-8 rounded-md bg-primary/10 text-primary text-xs font-medium">
            <span className="capitalize">{statusFilter}</span>
            <X className="w-3 h-3" />
          </button>
        )}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} request{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <TH>Request</TH>
                <TH>Buyer</TH>
                <TH><SH col="budget" label="Budget" /></TH>
                <TH><SH col="deadline" label="Deadline" /></TH>
                <TH><SH col="responseCount" label="Responses" /></TH>
                <TH>Format</TH>
                <TH>Status</TH>
                <TH />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map(r => (
                <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                  <TD>
                    <div className="flex items-start gap-2 max-w-[280px]">
                      {r.urgent && (
                        <span className="mt-0.5 flex-shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-700">
                          <Zap className="w-2.5 h-2.5" /> URG
                        </span>
                      )}
                      <div className="min-w-0">
                        <button onClick={() => onNavigate("admin-request-detail")}
                          className="text-sm font-medium text-foreground hover:text-primary text-left line-clamp-1 transition-colors">
                          {r.title}
                        </button>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-muted-foreground">{r.id}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                          <span className="text-[10px] text-muted-foreground">{r.category}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                          <MapPin className="w-2.5 h-2.5 text-muted-foreground/60" />
                          <span className="text-[10px] text-muted-foreground">{r.location}</span>
                        </div>
                      </div>
                    </div>
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Avatar src={r.buyerAvatar} name={r.buyer} size={28} />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">{r.buyer}</div>
                        <div className="text-[10px] text-muted-foreground truncate">{r.buyerOrg}</div>
                      </div>
                    </div>
                  </TD>
                  <TD><span className="text-sm font-semibold text-foreground">${r.budget}</span></TD>
                  <TD><span className="text-xs text-muted-foreground">{r.deadline}</span></TD>
                  <TD>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground/60" />
                      <span className="text-sm font-medium">{r.responseCount}</span>
                    </div>
                  </TD>
                  <TD>
                    <span className={cn("px-2 py-0.5 rounded text-[11px] font-medium", formatColor[r.formatPref])}>
                      {r.formatPref}
                    </span>
                  </TD>
                  <TD>
                    <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium capitalize", statusColor[r.status])}>
                      {r.status}
                    </span>
                  </TD>
                  <TD>
                    <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate("admin-request-detail")}>View</Btn>
                  </TD>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-muted-foreground">No requests match the current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="border-t border-border px-4 py-3">
            <Pagination page={page} total={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Request Detail ───────────────────────────────────────────────
function AdminRequestDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const req = ADMIN_REQUESTS[0];
  const responses = REQUEST_RESPONSES.filter(r => r.requestId === req.id);
  const [actionStatus, setActionStatus] = useState<AdminRequestStatus>(req.status);
  const [extendOpen, setExtendOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [newDeadline, setNewDeadline] = useState(req.deadline);
  const [closeReason, setCloseReason] = useState("");
  const [localResponses, setLocalResponses] = useState(responses);

  function acceptResponse(id: string) {
    setLocalResponses(prev => prev.map(r => r.id === id
      ? { ...r, status: "accepted" }
      : r.status === "accepted" ? { ...r, status: "pending" as const } : r
    ));
    setActionStatus("assigned");
  }
  function rejectResponse(id: string) {
    setLocalResponses(prev => prev.map(r => r.id === id ? { ...r, status: "rejected" as const } : r));
  }

  const statusColor: Record<AdminRequestStatus, string> = {
    open:      "bg-sky-100 text-sky-700 border-sky-200",
    assigned:  "bg-amber-100 text-amber-700 border-amber-200",
    fulfilled: "bg-emerald-100 text-emerald-700 border-emerald-200",
    expired:   "bg-red-100 text-red-600 border-red-200",
    closed:    "bg-zinc-100 text-zinc-500 border-zinc-200",
  };

  const ratingStars = (n: number) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(n) ? "text-amber-400" : "text-zinc-200"}>★</span>
  ));

  const timeline = [
    { time: "2026-05-20 08:42", label: "Request created", icon: Plus, color: "text-sky-600 bg-sky-50" },
    { time: "2026-05-21 09:14", label: "First response received (Elena Marchetti)", icon: MessageSquare, color: "text-violet-600 bg-violet-50" },
    { time: "2026-05-21 11:30", label: "Second response received (Sasha Kovalenko)", icon: MessageSquare, color: "text-violet-600 bg-violet-50" },
    { time: "2026-05-22 08:05", label: "Third response received (Carl Henriksson)", icon: MessageSquare, color: "text-violet-600 bg-violet-50" },
  ];

  return (
    <Page title="Request Detail" breadcrumbs={["Admin", "Content", "Requests", req.id]}>
      {/* Back link */}
      <button onClick={() => onNavigate("admin-requests")}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ChevronLeft className="w-3.5 h-3.5" /> Back to Requests
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {req.urgent && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">
                      <Zap className="w-3 h-3" /> URGENT
                    </span>
                  )}
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize", statusColor[actionStatus])}>
                    {actionStatus}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">{req.category}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground leading-tight mb-1">{req.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Deadline: <span className="text-foreground font-medium">{req.deadline}</span></span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Posted: {req.createdAt}</span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-foreground">${req.budget}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Budget cap</div>
                <div className="flex items-center gap-1.5 mt-1.5 justify-end">
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 text-[11px] font-medium">{req.formatPref}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" /> Brief Description
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{req.description}</p>
          </div>

          {/* Responses */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Reporter Responses
                <span className="ml-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]">{localResponses.length}</span>
              </h3>
            </div>

            {localResponses.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">No responses yet.</div>
            )}

            <div className="space-y-4">
              {localResponses.map(resp => (
                <div key={resp.id} className={cn(
                  "rounded-lg border p-4 transition-colors",
                  resp.status === "accepted" ? "border-emerald-200 bg-emerald-50/40" :
                  resp.status === "rejected" ? "border-red-100 bg-red-50/30 opacity-60" :
                  "border-border"
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Avatar src={resp.reporterAvatar} name={resp.reporter} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-foreground">{resp.reporter}</span>
                          <span className="text-[11px] text-muted-foreground">{resp.reporterCountry}</span>
                          <span className="flex text-[11px]">{ratingStars(resp.reporterRating)}</span>
                          <span className="text-[11px] text-amber-600 font-medium">{resp.reporterRating}</span>
                          {resp.status === "accepted" && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                              <CheckCircle className="w-2.5 h-2.5" /> Accepted
                            </span>
                          )}
                          {resp.status === "rejected" && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-semibold">
                              <XCircle className="w-2.5 h-2.5" /> Rejected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">{resp.message}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm font-bold text-foreground">${resp.proposedPrice}</span>
                          <span className="text-xs text-muted-foreground">proposed price</span>
                          <span className="text-[10px] text-muted-foreground ml-auto">{resp.submittedAt}</span>
                        </div>
                      </div>
                    </div>
                    {resp.status === "pending" && (
                      <div className="flex gap-2 flex-shrink-0">
                        <Btn variant="outline" size="xs" icon={XCircle} onClick={() => rejectResponse(resp.id)}>Reject</Btn>
                        <Btn variant="primary" size="xs" icon={CheckCircle} onClick={() => acceptResponse(resp.id)}>Accept</Btn>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" /> Activity Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {timeline.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 relative pl-1">
                      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10", t.color)}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="pt-1">
                        <div className="text-xs font-medium text-foreground">{t.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{t.time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Buyer card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Buyer</h3>
            <div className="flex items-center gap-3 mb-3">
              <Avatar src={req.buyerAvatar} name={req.buyer} size={40} />
              <div>
                <div className="text-sm font-semibold text-foreground">{req.buyer}</div>
                <div className="text-xs text-muted-foreground">{req.buyerOrg}</div>
              </div>
            </div>
            <div className="space-y-2">
              <button onClick={() => onNavigate("admin-user-detail")}
                className="w-full flex items-center justify-center gap-1.5 h-8 rounded-md border border-border text-xs font-medium hover:bg-muted/40 transition-colors">
                <Eye className="w-3 h-3" /> View profile
              </button>
              <button className="w-full flex items-center justify-center gap-1.5 h-8 rounded-md border border-border text-xs font-medium hover:bg-muted/40 transition-colors">
                <Mail className="w-3 h-3" /> Send message
              </button>
            </div>
          </div>

          {/* Assigned reporter (when assigned) */}
          {req.assignedReporter && (
            <div className="bg-card border border-emerald-200 rounded-xl p-5">
              <h3 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Assigned Reporter
              </h3>
              <div className="flex items-center gap-3">
                <Avatar src="https://i.pravatar.cc/80?img=47" name={req.assignedReporter} size={40} />
                <div>
                  <div className="text-sm font-semibold text-foreground">{req.assignedReporter}</div>
                  <div className="text-xs text-muted-foreground">Italy · ★ 4.9</div>
                </div>
              </div>
              <button onClick={() => onNavigate("admin-reporter-detail")}
                className="w-full mt-3 flex items-center justify-center gap-1.5 h-8 rounded-md border border-border text-xs font-medium hover:bg-muted/40 transition-colors">
                <Eye className="w-3 h-3" /> View reporter profile
              </button>
            </div>
          )}

          {/* Request metadata */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Details</h3>
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Request ID</dt><dd className="font-mono text-foreground">{req.id}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Category</dt><dd className="text-foreground">{req.category}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Format</dt><dd className="text-foreground">{req.formatPref}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd className="text-foreground">{req.location}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Budget cap</dt><dd className="font-semibold text-foreground">${req.budget}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Deadline</dt><dd className="text-foreground">{req.deadline}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Posted</dt><dd className="text-foreground">{req.createdAt}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Responses</dt><dd className="font-semibold text-foreground">{req.responseCount}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Urgent</dt><dd>{req.urgent ? <span className="text-red-600 font-semibold">Yes</span> : <span className="text-muted-foreground">No</span>}</dd></div>
            </dl>
          </div>

          {/* Admin actions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Admin Actions</h3>
            <div className="space-y-2">
              <button onClick={() => setExtendOpen(true)}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-border text-xs font-medium hover:bg-muted/40 transition-colors text-left">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Extend deadline
              </button>
              <button onClick={() => setActionStatus("fulfilled")}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-emerald-300 bg-emerald-50 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors text-left">
                <CheckCircle className="w-3.5 h-3.5" /> Mark as fulfilled
              </button>
              <button
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-amber-300 bg-amber-50 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors text-left">
                <AlertTriangle className="w-3.5 h-3.5" /> Flag as spam
              </button>
              <button onClick={() => setCloseOpen(true)}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-red-200 bg-red-50/60 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors text-left">
                <XCircle className="w-3.5 h-3.5" /> Close request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extend deadline modal */}
      {extendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Extend Deadline</p>
                <p className="text-xs text-muted-foreground">Current: {req.deadline}</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">New deadline</label>
              <input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)}
                className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setExtendOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={Calendar} onClick={() => { setExtendOpen(false); }}>Save deadline</Btn>
            </div>
          </div>
        </div>
      )}

      {/* Close request modal */}
      {closeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Close Request</p>
                <p className="text-xs text-muted-foreground">This will close the request and notify the buyer.</p>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Reason <span className="text-red-500">*</span></label>
              <textarea value={closeReason} onChange={e => setCloseReason(e.target.value)} rows={3}
                placeholder="Explain why this request is being closed…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setCloseOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={XCircle} onClick={() => { setActionStatus("closed"); setCloseOpen(false); }}>Close request</Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Disputes List ───────────────────────────────────────────────
function AdminDisputesScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | DisputeStatus>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortKey, setSortKey] = useState<"amount" | "openedAt" | "updatedAt">("openedAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const counts = useMemo(() => ({
    open:          DISPUTES.filter(d => d.status === "open").length,
    under_review:  DISPUTES.filter(d => d.status === "under_review").length,
    awaiting_info: DISPUTES.filter(d => d.status === "awaiting_info").length,
    escalated:     DISPUTES.filter(d => d.status === "escalated").length,
    resolved:      DISPUTES.filter(d => d.status === "resolved").length,
    closed:        DISPUTES.filter(d => d.status === "closed").length,
  }), []);

  const totalValue = DISPUTES.filter(d => !["resolved","closed"].includes(d.status)).reduce((s, d) => s + d.amount, 0);

  const filtered = useMemo(() => {
    let list = [...DISPUTES];
    if (statusFilter !== "all") list = list.filter(d => d.status === statusFilter);
    if (priorityFilter !== "all") list = list.filter(d => d.priority === priorityFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(d =>
        d.id.toLowerCase().includes(q) ||
        d.reportageTitle.toLowerCase().includes(q) ||
        d.buyer.toLowerCase().includes(q) ||
        d.reporter.toLowerCase().includes(q)
      );
    }
    list.sort((a, b) => {
      const av = sortKey === "amount" ? a.amount : sortKey === "updatedAt" ? a.updatedAt : a.openedAt;
      const bv = sortKey === "amount" ? b.amount : sortKey === "updatedAt" ? b.updatedAt : b.openedAt;
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, statusFilter, priorityFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleSort(k: typeof sortKey) {
    if (sortKey === k) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(k); setSortDir("desc"); }
  }

  const SH = ({ col, label }: { col: typeof sortKey; label: string }) => (
    <button onClick={() => toggleSort(col)} className="flex items-center gap-1 hover:text-foreground transition-colors">
      {label}
      {sortKey === col
        ? (sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)
        : <ChevronsUpDown className="w-3 h-3 opacity-40" />}
    </button>
  );

  const statusStyle: Record<DisputeStatus, string> = {
    open:          "bg-sky-100 text-sky-700",
    under_review:  "bg-violet-100 text-violet-700",
    awaiting_info: "bg-amber-100 text-amber-700",
    escalated:     "bg-red-100 text-red-700",
    resolved:      "bg-emerald-100 text-emerald-700",
    closed:        "bg-zinc-100 text-zinc-500",
  };
  const statusLabel: Record<DisputeStatus, string> = {
    open: "Open", under_review: "Under Review", awaiting_info: "Awaiting Info",
    escalated: "Escalated", resolved: "Resolved", closed: "Closed",
  };
  const priorityStyle: Record<string, string> = {
    high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-zinc-100 text-zinc-500",
  };
  const reasonLabel: Record<DisputeReason, string> = {
    quality: "Quality", late_delivery: "Late Delivery", missing_content: "Missing Content",
    unauthorized_use: "Unauthorised Use", payment: "Payment", other: "Other",
  };

  return (
    <Page title="Disputes" breadcrumbs={["Admin", "Financial", "Disputes"]}>
      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">{DISPUTES.length}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Total disputes</div>
        </div>
        <div className="bg-card border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">{counts.open + counts.under_review + counts.escalated}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Active (open + review + escalated)</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">${totalValue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Value at stake</div>
        </div>
        <div className="bg-card border border-emerald-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-emerald-600">{counts.resolved}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Resolved</div>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {(["all","open","under_review","awaiting_info","escalated","resolved","closed"] as ("all" | DisputeStatus)[]).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={cn("px-3 h-7 rounded-full text-xs font-medium border transition-colors",
              statusFilter === s
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40")}>
            {s === "all" ? `All (${DISPUTES.length})` : `${statusLabel[s as DisputeStatus]} (${counts[s as DisputeStatus]})`}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search by ID, title, buyer, reporter…" className="w-72" />
        <div className="flex items-center gap-1 ml-auto">
          {(["all","high","medium","low"] as const).map(p => (
            <button key={p} onClick={() => { setPriorityFilter(p); setPage(1); }}
              className={cn("px-2.5 h-7 rounded-md text-xs font-medium border transition-colors capitalize",
                priorityFilter === p
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground")}>
              {p === "all" ? "All priority" : p}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{filtered.length} dispute{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <TH>Dispute</TH>
                <TH>Buyer</TH>
                <TH>Reporter</TH>
                <TH>Reason</TH>
                <TH><SH col="amount" label="Amount" /></TH>
                <TH>Priority</TH>
                <TH>Status</TH>
                <TH><SH col="openedAt" label="Opened" /></TH>
                <TH />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map(d => (
                <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                  <TD>
                    <div className="max-w-[200px]">
                      <button onClick={() => onNavigate("admin-dispute-detail")}
                        className="text-xs font-semibold text-primary hover:underline block">{d.id}</button>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{d.reportageTitle}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5">Order: {d.orderId}</p>
                    </div>
                  </TD>
                  <TD>
                    <div className="flex items-center gap-1.5">
                      <Avatar src={d.buyerAvatar} name={d.buyer} size={24} />
                      <span className="text-xs text-foreground truncate max-w-[100px]">{d.buyer}</span>
                    </div>
                  </TD>
                  <TD>
                    <div className="flex items-center gap-1.5">
                      <Avatar src={d.reporterAvatar} name={d.reporter} size={24} />
                      <span className="text-xs text-foreground truncate max-w-[100px]">{d.reporter}</span>
                    </div>
                  </TD>
                  <TD>
                    <span className="text-xs text-muted-foreground">{reasonLabel[d.reason]}</span>
                  </TD>
                  <TD>
                    <span className="text-sm font-semibold text-foreground">${d.amount}</span>
                    {d.resolution === "buyer_refund" && d.refundAmount && (
                      <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Refunded ${d.refundAmount}</div>
                    )}
                    {d.resolution === "partial_refund" && d.refundAmount && (
                      <div className="text-[10px] text-amber-600 font-medium mt-0.5">Partial ${d.refundAmount}</div>
                    )}
                  </TD>
                  <TD>
                    <span className={cn("px-2 py-0.5 rounded text-[11px] font-medium capitalize", priorityStyle[d.priority])}>
                      {d.priority}
                    </span>
                  </TD>
                  <TD>
                    <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium whitespace-nowrap", statusStyle[d.status])}>
                      {statusLabel[d.status]}
                    </span>
                  </TD>
                  <TD>
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">{d.openedAt.split(" ")[0]}</span>
                  </TD>
                  <TD>
                    <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate("admin-dispute-detail")}>Review</Btn>
                  </TD>
                </tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-muted-foreground">No disputes match the current filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="border-t border-border px-4 py-3">
            <Pagination page={page} total={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Dispute Detail ───────────────────────────────────────────────
function AdminDisputeDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const dispute = DISPUTES[0];
  const messages = DISPUTE_MESSAGES.filter(m => m.disputeId === dispute.id);
  const [localStatus, setLocalStatus] = useState<DisputeStatus>(dispute.status);
  const [newMessage, setNewMessage] = useState("");
  const [localMessages, setLocalMessages] = useState(messages);
  const [resolveOpen, setResolveOpen] = useState(false);
  const [escalateOpen, setEscalateOpen] = useState(false);
  const [resolutionChoice, setResolutionChoice] = useState<DisputeResolution>(null);
  const [refundInput, setRefundInput] = useState("");
  const [adminNoteInput, setAdminNoteInput] = useState(dispute.adminNote);

  function sendMessage() {
    if (!newMessage.trim()) return;
    setLocalMessages(prev => [...prev, {
      id: `DM-new-${Date.now()}`, disputeId: dispute.id,
      sender: "Admin", senderAvatar: "", senderRole: "admin",
      body: newMessage.trim(), sentAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    }]);
    setNewMessage("");
  }

  const statusStyle: Record<DisputeStatus, string> = {
    open: "bg-sky-100 text-sky-700 border-sky-200",
    under_review: "bg-violet-100 text-violet-700 border-violet-200",
    awaiting_info: "bg-amber-100 text-amber-700 border-amber-200",
    escalated: "bg-red-100 text-red-700 border-red-200",
    resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    closed: "bg-zinc-100 text-zinc-500 border-zinc-200",
  };
  const statusLabel: Record<DisputeStatus, string> = {
    open: "Open", under_review: "Under Review", awaiting_info: "Awaiting Info",
    escalated: "Escalated", resolved: "Resolved", closed: "Closed",
  };
  const priorityStyle: Record<string, string> = {
    high: "text-red-600 bg-red-50 border-red-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    low: "text-zinc-500 bg-zinc-50 border-zinc-200",
  };
  const roleStyle: Record<string, string> = {
    buyer: "bg-blue-50 border-blue-100",
    reporter: "bg-violet-50 border-violet-100",
    admin: "bg-muted border-border",
  };
  const roleLabel: Record<string, string> = { buyer: "Buyer", reporter: "Reporter", admin: "Admin" };

  const resolutionOptions: { value: DisputeResolution; label: string; desc: string; color: string }[] = [
    { value: "buyer_refund",    label: "Full Refund to Buyer",   desc: "Full order amount returned to buyer",         color: "border-emerald-300 bg-emerald-50/50" },
    { value: "reporter_paid",   label: "Release to Reporter",    desc: "Escrow released to reporter in full",          color: "border-violet-300 bg-violet-50/50" },
    { value: "partial_refund",  label: "Partial Refund",         desc: "Split the amount between parties",             color: "border-amber-300 bg-amber-50/50" },
    { value: "no_action",       label: "No Action / Close",      desc: "Dismiss dispute without financial adjustment", color: "border-zinc-200 bg-zinc-50" },
  ];

  return (
    <Page title="Dispute Detail" breadcrumbs={["Admin", "Financial", "Disputes", dispute.id]}>
      <button onClick={() => onNavigate("admin-disputes")}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ChevronLeft className="w-3.5 h-3.5" /> Back to Disputes
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">

          {/* Header */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold border", statusStyle[localStatus])}>
                    {statusLabel[localStatus]}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded border text-xs font-medium capitalize", priorityStyle[dispute.priority])}>
                    {dispute.priority} priority
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{dispute.id}</span>
                </div>
                <h2 className="text-base font-semibold text-foreground leading-tight mb-1">{dispute.reportageTitle}</h2>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>Order: <span className="text-foreground font-medium">{dispute.orderId}</span></span>
                  <span>Opened: <span className="text-foreground">{dispute.openedAt}</span></span>
                  <span>Updated: <span className="text-foreground">{dispute.updatedAt}</span></span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-foreground">${dispute.amount}</div>
                <div className="text-xs text-muted-foreground">Disputed amount</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" /> Buyer's Complaint
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{dispute.description}</p>
          </div>

          {/* Message thread */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground" /> Conversation
              <span className="ml-1 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[11px]">{localMessages.length}</span>
            </h3>

            <div className="space-y-4 mb-5">
              {localMessages.map(m => (
                <div key={m.id} className={cn("rounded-lg border p-4", roleStyle[m.senderRole])}>
                  <div className="flex items-center gap-2 mb-2">
                    {m.senderRole === "admin"
                      ? <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-3.5 h-3.5 text-primary" />
                        </div>
                      : <Avatar src={m.senderAvatar} name={m.sender} size={28} />
                    }
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-foreground">{m.sender}</span>
                      <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium",
                        m.senderRole === "admin" ? "bg-primary/10 text-primary" :
                        m.senderRole === "buyer" ? "bg-blue-100 text-blue-700" : "bg-violet-100 text-violet-700"
                      )}>{roleLabel[m.senderRole]}</span>
                      <span className="text-[10px] text-muted-foreground">{m.sentAt}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                </div>
              ))}
              {localMessages.length === 0 && (
                <div className="py-6 text-center text-sm text-muted-foreground">No messages yet.</div>
              )}
            </div>

            {/* Admin reply box */}
            <div className="border-t border-border pt-4">
              <label className="text-xs font-medium text-foreground block mb-2">Send admin message</label>
              <textarea
                value={newMessage} onChange={e => setNewMessage(e.target.value)}
                rows={3} placeholder="Write a message visible to both parties…"
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-2"
              />
              <div className="flex justify-end">
                <Btn variant="primary" size="sm" icon={Send} onClick={sendMessage} disabled={!newMessage.trim()}>Send</Btn>
              </div>
            </div>
          </div>

          {/* Admin note */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4 text-muted-foreground" /> Internal Admin Note
              <span className="text-[11px] text-muted-foreground font-normal">(not visible to parties)</span>
            </h3>
            <textarea
              value={adminNoteInput} onChange={e => setAdminNoteInput(e.target.value)}
              rows={3} placeholder="Add internal notes, references, or investigation findings…"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none resize-none"
            />
            <div className="flex justify-end mt-2">
              <Btn variant="outline" size="sm" icon={CheckCircle}>Save note</Btn>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Parties */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Parties</h3>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider mb-1.5">Buyer (Claimant)</div>
                <div className="flex items-center gap-2.5">
                  <Avatar src={dispute.buyerAvatar} name={dispute.buyer} size={34} />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{dispute.buyer}</div>
                    <div className="text-xs text-muted-foreground">{dispute.buyerOrg}</div>
                  </div>
                </div>
                <button onClick={() => onNavigate("admin-user-detail")}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 h-7 rounded-md border border-border text-[11px] font-medium hover:bg-muted/40 transition-colors">
                  <Eye className="w-3 h-3" /> View profile
                </button>
              </div>
              <div className="border-t border-border pt-3">
                <div className="text-[10px] font-semibold text-violet-600 uppercase tracking-wider mb-1.5">Reporter (Respondent)</div>
                <div className="flex items-center gap-2.5">
                  <Avatar src={dispute.reporterAvatar} name={dispute.reporter} size={34} />
                  <div>
                    <div className="text-sm font-semibold text-foreground">{dispute.reporter}</div>
                    <div className="text-xs text-muted-foreground">{dispute.reporterCountry}</div>
                  </div>
                </div>
                <button onClick={() => onNavigate("admin-reporter-detail")}
                  className="w-full mt-2 flex items-center justify-center gap-1.5 h-7 rounded-md border border-border text-[11px] font-medium hover:bg-muted/40 transition-colors">
                  <Eye className="w-3 h-3" /> View reporter
                </button>
              </div>
            </div>
          </div>

          {/* Dispute details */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Details</h3>
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Dispute ID</dt><dd className="font-mono text-foreground">{dispute.id}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Order</dt><dd className="font-mono text-foreground">{dispute.orderId}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Reason</dt><dd className="text-foreground capitalize">{dispute.reason.replace(/_/g, " ")}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Amount</dt><dd className="font-semibold text-foreground">${dispute.amount}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Priority</dt>
                <dd><span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium capitalize", priorityStyle[dispute.priority])}>{dispute.priority}</span></dd>
              </div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Opened</dt><dd className="text-foreground">{dispute.openedAt.split(" ")[0]}</dd></div>
              {dispute.resolution && (
                <div className="flex justify-between"><dt className="text-muted-foreground">Resolution</dt>
                  <dd className="text-emerald-600 font-medium capitalize">{dispute.resolution.replace(/_/g, " ")}</dd>
                </div>
              )}
              {dispute.refundAmount && (
                <div className="flex justify-between"><dt className="text-muted-foreground">Refund</dt><dd className="font-semibold text-emerald-600">${dispute.refundAmount}</dd></div>
              )}
            </dl>
          </div>

          {/* Actions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Admin Actions</h3>
            <div className="space-y-2">
              <button onClick={() => setLocalStatus("under_review")}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-violet-300 bg-violet-50 text-xs font-medium text-violet-700 hover:bg-violet-100 transition-colors text-left">
                <Eye className="w-3.5 h-3.5" /> Mark as Under Review
              </button>
              <button onClick={() => setLocalStatus("awaiting_info")}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-amber-300 bg-amber-50 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors text-left">
                <Clock className="w-3.5 h-3.5" /> Request More Info
              </button>
              <button onClick={() => setEscalateOpen(true)}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-red-200 bg-red-50/60 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors text-left">
                <AlertTriangle className="w-3.5 h-3.5" /> Escalate
              </button>
              <button onClick={() => setResolveOpen(true)}
                className="w-full flex items-center gap-2 px-3 h-9 rounded-md border border-emerald-300 bg-emerald-50 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors text-left">
                <CheckCircle className="w-3.5 h-3.5" /> Resolve Dispute
              </button>
            </div>
          </div>

          {/* Related links */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Related</h3>
            <div className="space-y-1.5">
              <button onClick={() => onNavigate("admin-reportage-detail")}
                className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors text-left py-1">
                <Camera className="w-3.5 h-3.5" /> View reportage
              </button>
              <button onClick={() => onNavigate("admin-order-detail")}
                className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors text-left py-1">
                <Package className="w-3.5 h-3.5" /> View order {dispute.orderId}
              </button>
              <button onClick={() => onNavigate("admin-transaction-detail")}
                className="w-full flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors text-left py-1">
                <DollarSign className="w-3.5 h-3.5" /> View transaction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resolve modal */}
      {resolveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-md space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">Resolve Dispute {dispute.id}</p>
                <p className="text-xs text-muted-foreground">Choose how to close this dispute</p>
              </div>
            </div>

            <div className="space-y-2">
              {resolutionOptions.map(opt => (
                <button key={opt.value} onClick={() => setResolutionChoice(opt.value)}
                  className={cn("w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors",
                    resolutionChoice === opt.value ? "border-primary ring-2 ring-primary/20" : opt.color)}>
                  <div className={cn("w-3.5 h-3.5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors",
                    resolutionChoice === opt.value ? "border-primary bg-primary" : "border-muted-foreground/40")} />
                  <div>
                    <div className="text-xs font-semibold text-foreground">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {resolutionChoice === "partial_refund" && (
              <div>
                <label className="text-xs font-medium block mb-1">Refund amount ($)</label>
                <input type="number" value={refundInput} onChange={e => setRefundInput(e.target.value)}
                  placeholder={`Max $${dispute.amount}`}
                  className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            )}

            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setResolveOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={CheckCircle}
                onClick={() => { setLocalStatus("resolved"); setResolveOpen(false); }}
                disabled={!resolutionChoice}>
                Confirm resolution
              </Btn>
            </div>
          </div>
        </div>
      )}

      {/* Escalate modal */}
      {escalateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Escalate Dispute</p>
                <p className="text-xs text-muted-foreground">This will flag the dispute for senior review.</p>
              </div>
            </div>
            <textarea rows={3} placeholder="Reason for escalation…"
              className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none resize-none" />
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setEscalateOpen(false)}>Cancel</Btn>
              <Btn variant="destructive" size="sm" icon={AlertTriangle}
                onClick={() => { setLocalStatus("escalated"); setEscalateOpen(false); }}>
                Escalate
              </Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Newsletters List ────────────────────────────────────────────
function AdminNewslettersScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | NewsletterStatus>("all");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const counts = useMemo(() => ({
    draft:     NEWSLETTERS.filter(n => n.status === "draft").length,
    scheduled: NEWSLETTERS.filter(n => n.status === "scheduled").length,
    sent:      NEWSLETTERS.filter(n => n.status === "sent").length,
    archived:  NEWSLETTERS.filter(n => n.status === "archived").length,
  }), []);

  const avgOpen  = NEWSLETTERS.filter(n => n.openRate  !== null).reduce((s, n) => s + (n.openRate  ?? 0), 0) / NEWSLETTERS.filter(n => n.openRate  !== null).length;
  const avgClick = NEWSLETTERS.filter(n => n.clickRate !== null).reduce((s, n) => s + (n.clickRate ?? 0), 0) / NEWSLETTERS.filter(n => n.clickRate !== null).length;
  const totalSent = NEWSLETTERS.filter(n => n.status === "sent").reduce((s, n) => s + n.recipientCount, 0);

  const filtered = useMemo(() => {
    let list = [...NEWSLETTERS];
    if (statusFilter !== "all") list = list.filter(n => n.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(n => n.subject.toLowerCase().includes(q) || n.tags.some(t => t.includes(q)));
    }
    list.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    return list;
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusStyle: Record<NewsletterStatus, string> = {
    draft:     "bg-zinc-100 text-zinc-500",
    scheduled: "bg-amber-100 text-amber-700",
    sent:      "bg-emerald-100 text-emerald-700",
    archived:  "bg-blue-100 text-blue-600",
  };
  const audienceLabel: Record<string, string> = {
    all: "All users", buyers: "Buyers", reporters: "Reporters", subscribers: "Subscribers",
  };

  return (
    <Page title="Newsletters" breadcrumbs={["Admin", "CMS", "Newsletters"]}>
      {/* Stat bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-xl font-bold text-foreground">{totalSent.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Total emails sent</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-xl font-bold text-foreground">{avgOpen.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground mt-0.5">Avg open rate</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-xl font-bold text-foreground">{avgClick.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground mt-0.5">Avg click rate</div>
        </div>
        <div className="bg-card border border-amber-200 rounded-lg p-4">
          <div className="text-xl font-bold text-amber-600">{counts.scheduled}</div>
          <div className="text-xs text-muted-foreground mt-0.5">Scheduled</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1">
          {(["all","draft","scheduled","sent","archived"] as ("all" | NewsletterStatus)[]).map(s => (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className={cn("px-3 h-7 rounded-full text-xs font-medium border transition-colors capitalize",
                statusFilter === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground")}>
              {s === "all" ? `All (${NEWSLETTERS.length})` : `${s} (${counts[s as NewsletterStatus]})`}
            </button>
          ))}
        </div>
        <SearchInput value={search} onChange={v => { setSearch(v); setPage(1); }} placeholder="Search subject or tag…" className="w-56 ml-auto" />
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => onNavigate("admin-newsletter-new")}>New newsletter</Btn>
      </div>

      {/* Cards grid */}
      <div className="space-y-3">
        {paged.map(n => (
          <div key={n.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium capitalize", statusStyle[n.status])}>
                    {n.status}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{audienceLabel[n.audience]}</span>
                  {n.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{t}</span>
                  ))}
                </div>
                <button onClick={() => onNavigate("admin-newsletter-detail")}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors text-left leading-snug">
                  {n.subject}
                </button>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{n.preheader}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs text-muted-foreground">
                  {n.status === "sent" && (
                    <>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{n.recipientCount.toLocaleString()} recipients</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-medium"><TrendingUp className="w-3 h-3" />{n.openRate}% open</span>
                      <span className="flex items-center gap-1 text-sky-600 font-medium"><ArrowRight className="w-3 h-3" />{n.clickRate}% click</span>
                      <span>Sent {n.sentAt?.split(" ")[0]}</span>
                    </>
                  )}
                  {n.status === "scheduled" && (
                    <span className="flex items-center gap-1 text-amber-600"><Calendar className="w-3 h-3" />Scheduled {n.scheduledAt?.split(" ")[0]} at {n.scheduledAt?.split(" ")[1]}</span>
                  )}
                  {(n.status === "draft" || n.status === "archived") && (
                    <span>Created {n.createdAt}</span>
                  )}
                  <span className="font-mono">{n.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {n.status !== "sent" && n.status !== "archived" && (
                  <Btn variant="outline" size="xs" icon={Edit} onClick={() => onNavigate("admin-newsletter-edit")}>Edit</Btn>
                )}
                <Btn variant="ghost" size="xs" icon={Eye} onClick={() => onNavigate("admin-newsletter-detail")}>View</Btn>
                <button className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted/40 transition-colors">
                  <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Mini stats bar for sent */}
            {n.status === "sent" && n.openRate !== null && (
              <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[10px] text-muted-foreground mb-1">Open rate</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${n.openRate}%` }} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground mb-1">Click rate</div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(n.clickRate ?? 0) * 3}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {paged.length === 0 && (
          <div className="bg-card border border-dashed border-border rounded-xl py-16 text-center">
            <Mail className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No newsletters match the current filters.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Newsletter New / Edit ────────────────────────────────────────
function AdminNewsletterEditScreen({ onNavigate, isNew }: { onNavigate: (s: Screen) => void; isNew?: boolean }) {
  const src = isNew ? null : NEWSLETTERS.find(n => n.status === "draft") ?? NEWSLETTERS[0];
  const [subject, setSubject]           = useState(src?.subject ?? "");
  const [preheader, setPreheader]       = useState(src?.preheader ?? "");
  const [audience, setAudience]         = useState<NewsletterRow["audience"]>(src?.audience ?? "all");
  const [tags, setTags]                 = useState(src?.tags.join(", ") ?? "");
  const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">("schedule");
  const [schedDate, setSchedDate]       = useState(src?.scheduledAt?.split(" ")[0] ?? "2026-06-01");
  const [schedTime, setSchedTime]       = useState(src?.scheduledAt?.split(" ")[1] ?? "08:00");
  const [saveOpen, setSaveOpen]         = useState(false);

  const title = isNew ? "New Newsletter" : "Edit Newsletter";
  const crumbs = isNew
    ? ["Admin", "CMS", "Newsletters", "New"]
    : ["Admin", "CMS", "Newsletters", src?.id ?? "", "Edit"];

  const audienceOptions: { value: NewsletterRow["audience"]; label: string; desc: string; count: number }[] = [
    { value: "all",         label: "All users",   desc: "Every registered user",             count: 12520 },
    { value: "buyers",      label: "Buyers",      desc: "Users with buyer accounts",          count: 4210 },
    { value: "reporters",   label: "Reporters",   desc: "Verified reporters on the platform", count: 2180 },
    { value: "subscribers", label: "Subscribers", desc: "Premium subscription holders",       count: 1740 },
  ];

  const bodyPlaceholder = `Dear {{first_name}},

Welcome to the latest edition of the GoDigiMarket digest.

This week's highlights:
- New ground reportages from Eastern Europe
- Reporter spotlight: Elena Marchetti — covering EU Council sessions
- Platform update: improved delivery tracking

[CTA BUTTON: Browse Latest Reportages]

Best,
The GoDigiMarket Team`;

  const [body, setBody] = useState(src ? "Dear {{first_name}},\n\n" + src.preheader + "\n\nThis week on GoDigiMarket — curated content from our verified field reporters around the world.\n\n[CTA BUTTON: Browse Latest Reportages]\n\nBest,\nThe GoDigiMarket Team" : "");

  return (
    <Page title={title} breadcrumbs={crumbs}>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => onNavigate("admin-newsletters")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="ml-auto flex gap-2">
          <Btn variant="outline" size="sm" onClick={() => onNavigate("admin-newsletters")}>Discard</Btn>
          <Btn variant="outline" size="sm" icon={Eye} onClick={() => onNavigate("admin-newsletter-detail")}>Preview</Btn>
          <Btn variant="primary" size="sm" icon={CheckCircle} onClick={() => setSaveOpen(true)}>
            {isNew ? "Create newsletter" : "Save changes"}
          </Btn>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Editor */}
        <div className="xl:col-span-2 space-y-5">
          {/* Subject & preheader */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Email Header</h3>
            <div>
              <label className="block text-xs font-medium mb-1">Subject line <span className="text-red-500">*</span></label>
              <input value={subject} onChange={e => setSubject(e.target.value)}
                placeholder="e.g. GoDigiMarket Weekly Digest — May 2026 #5"
                className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
              <div className="flex justify-between mt-1">
                <p className="text-[11px] text-muted-foreground">Aim for 40–60 characters</p>
                <span className={cn("text-[11px]", subject.length > 60 ? "text-amber-500" : "text-muted-foreground")}>{subject.length}/80</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Preheader text</label>
              <input value={preheader} onChange={e => setPreheader(e.target.value)}
                placeholder="Short preview text shown after subject in inbox…"
                className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
              <p className="text-[11px] text-muted-foreground mt-1">Shown below subject in email clients. Keep under 90 chars.</p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Body</h3>
              <span className="text-[11px] text-muted-foreground">Plain text — HTML wrapper applied on send</span>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {["{{first_name}}", "{{platform_name}}", "{{unsubscribe_link}}", "{{web_version_link}}"].map(v => (
                <button key={v} onClick={() => setBody(b => b + v)}
                  className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[11px] font-mono hover:bg-primary/10 hover:text-primary transition-colors">
                  {v}
                </button>
              ))}
            </div>
            <textarea
              value={body} onChange={e => setBody(e.target.value)}
              rows={16} placeholder={bodyPlaceholder}
              className="w-full px-3 py-2.5 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
            <p className="text-[11px] text-muted-foreground mt-1.5">{body.split(/\s+/).filter(Boolean).length} words · {body.length} chars</p>
          </div>

          {/* Tags */}
          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <input value={tags} onChange={e => setTags(e.target.value)}
              placeholder="e.g. digest, weekly, buyers"
              className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
            <p className="text-[11px] text-muted-foreground mt-1">Comma-separated. Used for filtering in the newsletter list.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Audience */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Audience</h3>
            <div className="space-y-2">
              {audienceOptions.map(opt => (
                <button key={opt.value} onClick={() => setAudience(opt.value)}
                  className={cn("w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors",
                    audience === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                  <div className={cn("w-3.5 h-3.5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors",
                    audience === opt.value ? "border-primary bg-primary" : "border-muted-foreground/40")} />
                  <div>
                    <div className="text-xs font-semibold text-foreground">{opt.label}</div>
                    <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
                    <div className="text-[11px] font-medium text-foreground mt-0.5">{opt.count.toLocaleString()} recipients</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Send settings</h3>
            <div className="space-y-2 mb-4">
              {(["schedule","now"] as const).map(m => (
                <button key={m} onClick={() => setScheduleMode(m)}
                  className={cn("w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors",
                    scheduleMode === m ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                  <div className={cn("w-3.5 h-3.5 rounded-full border-2 flex-shrink-0",
                    scheduleMode === m ? "border-primary bg-primary" : "border-muted-foreground/40")} />
                  <span className="text-xs font-medium">{m === "now" ? "Send immediately" : "Schedule for later"}</span>
                </button>
              ))}
            </div>
            {scheduleMode === "schedule" && (
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium mb-1">Date</label>
                  <input type="date" value={schedDate} onChange={e => setSchedDate(e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Time (UTC)</label>
                  <input type="time" value={schedTime} onChange={e => setSchedTime(e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none" />
                </div>
              </div>
            )}
          </div>

          {/* Quick checklist */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pre-send checklist</h3>
            <div className="space-y-2">
              {[
                { label: "Subject line filled",     done: subject.length > 5 },
                { label: "Preheader text filled",   done: preheader.length > 5 },
                { label: "Body content written",    done: body.length > 50 },
                { label: "Audience selected",       done: true },
                { label: "{{unsubscribe_link}} present", done: body.includes("{{unsubscribe_link}}") },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className={cn("w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                    item.done ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground/40")}>
                    {item.done ? <CheckCircle className="w-2.5 h-2.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                  </div>
                  <span className={item.done ? "text-foreground" : "text-muted-foreground"}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save confirmation modal */}
      {saveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-card border border-border rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{scheduleMode === "now" ? "Send now?" : "Schedule newsletter?"}</p>
                <p className="text-xs text-muted-foreground">
                  {scheduleMode === "now"
                    ? `Will be sent immediately to ${audienceOptions.find(a => a.value === audience)?.count.toLocaleString()} recipients.`
                    : `Scheduled for ${schedDate} at ${schedTime} UTC.`}
                </p>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Btn variant="outline" size="sm" onClick={() => setSaveOpen(false)}>Cancel</Btn>
              <Btn variant="primary" size="sm" icon={scheduleMode === "now" ? Send : Calendar}
                onClick={() => { setSaveOpen(false); onNavigate("admin-newsletters"); }}>
                {scheduleMode === "now" ? "Send now" : "Schedule"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}

// ── SCREEN: Admin Newsletter Detail ───────────────────────────────────────────
function AdminNewsletterDetailScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const nl = NEWSLETTERS.find(n => n.status === "sent") ?? NEWSLETTERS[0];
  const isSent = nl.status === "sent";

  const statItems = isSent ? [
    { label: "Recipients",   value: nl.recipientCount.toLocaleString(), icon: Users,       color: "text-foreground" },
    { label: "Open rate",    value: `${nl.openRate}%`,                  icon: Eye,         color: "text-emerald-600" },
    { label: "Click rate",   value: `${nl.clickRate}%`,                 icon: ArrowRight,  color: "text-sky-600" },
    { label: "Unsubscribes", value: "14",                               icon: XCircle,     color: "text-red-500" },
  ] : [];

  const statusStyle: Record<NewsletterStatus, string> = {
    draft:     "bg-zinc-100 text-zinc-500",
    scheduled: "bg-amber-100 text-amber-700",
    sent:      "bg-emerald-100 text-emerald-700",
    archived:  "bg-blue-100 text-blue-600",
  };

  const previewBody = `Dear Jane,

${nl.preheader}

This week on GoDigiMarket — curated content from our verified field reporters around the world.

────────────────────────────

✦ Featured Reportage
Street Art Festival Porto 2026 — by Elena Marchetti
A photo essay from the heart of Porto's vibrant street art scene during the annual May festival. 45 high-resolution photos delivered.

✦ Reporter Spotlight
This week we feature Amara Diallo, our most decorated reporter in West Africa. Amara has covered 6 countries in the past 12 months.

✦ Platform Update
New bulk-download option for buyers: download all files in a delivery as a single ZIP directly from your dashboard.

────────────────────────────

Browse all reportages → godigimarket.io/browse

Unsubscribe from this list

© 2026 GoDigiMarket · 42 Rue de l'Innovation, Paris`;

  return (
    <Page title="Newsletter Detail" breadcrumbs={["Admin", "CMS", "Newsletters", nl.id]}>
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => onNavigate("admin-newsletters")}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-3.5 h-3.5" /> Back to Newsletters
        </button>
        <div className="ml-auto flex gap-2">
          {!isSent && (
            <Btn variant="outline" size="sm" icon={Edit} onClick={() => onNavigate("admin-newsletter-edit")}>Edit</Btn>
          )}
          {isSent && (
            <Btn variant="outline" size="sm" icon={Copy}>Duplicate</Btn>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="xl:col-span-2 space-y-5">
          {/* Header card */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize", statusStyle[nl.status])}>
                    {nl.status}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{nl.id}</span>
                  {nl.tags.map(t => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-[10px]">{t}</span>
                  ))}
                </div>
                <h2 className="text-base font-semibold text-foreground leading-snug mb-1">{nl.subject}</h2>
                <p className="text-xs text-muted-foreground">{nl.preheader}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                  <span>Audience: <span className="text-foreground font-medium capitalize">{nl.audience}</span></span>
                  <span>Author: <span className="text-foreground">{nl.author}</span></span>
                  {nl.sentAt && <span>Sent: <span className="text-foreground">{nl.sentAt}</span></span>}
                  {nl.scheduledAt && !nl.sentAt && <span className="text-amber-600">Scheduled: {nl.scheduledAt}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Performance stats (sent only) */}
          {isSent && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {statItems.map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={cn("w-4 h-4", s.color)} />
                      <span className="text-xs text-muted-foreground">{s.label}</span>
                    </div>
                    <div className={cn("text-xl font-bold", s.color)}>{s.value}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Open/click bar chart (sent only) */}
          {isSent && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Engagement breakdown</h3>
              <div className="space-y-4">
                {[
                  { label: "Delivered",    pct: 98.4, color: "bg-emerald-500" },
                  { label: "Opened",       pct: nl.openRate ?? 0, color: "bg-sky-500" },
                  { label: "Clicked",      pct: nl.clickRate ?? 0, color: "bg-violet-500" },
                  { label: "Unsubscribed", pct: 0.11, color: "bg-red-400" },
                ].map(bar => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{bar.label}</span>
                      <span className="font-semibold text-foreground">{bar.pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", bar.color)} style={{ width: `${Math.min(bar.pct, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email preview */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" /> Email Preview
            </h3>
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-5">
              <div className="text-xs text-muted-foreground mb-3 pb-3 border-b border-zinc-200 space-y-0.5">
                <div><span className="font-medium text-foreground">From:</span> GoDigiMarket &lt;noreply@godigimarket.io&gt;</div>
                <div><span className="font-medium text-foreground">Subject:</span> {nl.subject}</div>
                <div><span className="font-medium text-foreground">Preview:</span> {nl.preheader}</div>
              </div>
              <pre className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap font-sans">{previewBody}</pre>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Details */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Details</h3>
            <dl className="space-y-2.5 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">ID</dt><dd className="font-mono text-foreground">{nl.id}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd className="capitalize text-foreground">{nl.status}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Audience</dt><dd className="capitalize text-foreground">{nl.audience}</dd></div>
              {nl.recipientCount > 0 && (
                <div className="flex justify-between"><dt className="text-muted-foreground">Recipients</dt><dd className="font-semibold text-foreground">{nl.recipientCount.toLocaleString()}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-muted-foreground">Author</dt><dd className="text-foreground">{nl.author}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Created</dt><dd className="text-foreground">{nl.createdAt}</dd></div>
              {nl.scheduledAt && <div className="flex justify-between"><dt className="text-muted-foreground">Scheduled</dt><dd className="text-foreground">{nl.scheduledAt}</dd></div>}
              {nl.sentAt && <div className="flex justify-between"><dt className="text-muted-foreground">Sent</dt><dd className="text-foreground">{nl.sentAt}</dd></div>}
            </dl>
          </div>

          {/* Actions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Actions</h3>
            <div className="space-y-2">
              {!isSent && (
                <Btn variant="primary" size="sm" icon={Send} onClick={() => onNavigate("admin-newsletters")} className="w-full justify-center">
                  {nl.status === "scheduled" ? "Send now" : "Schedule & send"}
                </Btn>
              )}
              {!isSent && (
                <Btn variant="outline" size="sm" icon={Edit} onClick={() => onNavigate("admin-newsletter-edit")} className="w-full justify-center">Edit</Btn>
              )}
              <Btn variant="outline" size="sm" icon={Copy} className="w-full justify-center">Duplicate as draft</Btn>
              {isSent && (
                <Btn variant="ghost" size="sm" icon={Download} className="w-full justify-center">Export CSV report</Btn>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {nl.tags.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Admin Platform Settings ───────────────────────────────────────────
function AdminPlatformSettingsScreen() {
  // ── General ──
  const [siteName,       setSiteName]       = useState("GoDigiMarket");
  const [siteTagline,    setSiteTagline]     = useState("The Global Marketplace for Digital Reportages");
  const [supportEmail,   setSupportEmail]    = useState("support@godigimarket.io");
  const [supportPhone,   setSupportPhone]    = useState("+1 800 555 0199");
  const [timezone,       setTimezone]        = useState("UTC");
  const [defaultLang,    setDefaultLang]     = useState("en");
  const [defaultCurrency,setDefaultCurrency] = useState("USD");
  const [maintenance,    setMaintenance]     = useState(false);
  const [maintenanceMsg, setMaintenanceMsg]  = useState("The platform is temporarily unavailable for scheduled maintenance. We'll be back shortly.");

  // ── Financial ──
  const [platformFee,    setPlatformFee]     = useState("10");
  const [minPayout,      setMinPayout]       = useState("50");
  const [payoutCycle,    setPayoutCycle]     = useState<"weekly"|"biweekly"|"monthly">("biweekly");
  const [stripeKey,      setStripeKey]       = useState("sk_live_••••••••••••••••••••••••");
  const [vatRate,        setVatRate]         = useState("20");
  const [escrowHold,     setEscrowHold]      = useState("72");

  // ── Email / SMTP ──
  const [smtpHost,       setSmtpHost]        = useState("smtp.sendgrid.net");
  const [smtpPort,       setSmtpPort]        = useState("587");
  const [smtpUser,       setSmtpUser]        = useState("apikey");
  const [smtpPass,       setSmtpPass]        = useState("SG.••••••••••••••••••••••••");
  const [fromName,       setFromName]        = useState("GoDigiMarket");
  const [fromEmail,      setFromEmail]       = useState("noreply@godigimarket.io");
  const [smtpTls,        setSmtpTls]         = useState(true);

  // ── Upload / Storage ──
  const [maxFileMb,      setMaxFileMb]       = useState("800");
  const [allowedFormats, setAllowedFormats]  = useState("mp4,mov,jpg,jpeg,png,tiff,mp3,wav,pdf");
  const [storageProvider,setStorageProvider] = useState<"s3"|"gcs"|"r2">("s3");
  const [s3Bucket,       setS3Bucket]        = useState("godigimarket-prod-assets");
  const [s3Region,       setS3Region]        = useState("eu-central-1");
  const [cdnUrl,         setCdnUrl]          = useState("https://cdn.godigimarket.io");

  // ── Security ──
  const [mfaRequired,    setMfaRequired]     = useState(false);
  const [sessionHours,   setSessionHours]    = useState("24");
  const [maxLoginFails,  setMaxLoginFails]   = useState("5");
  const [captchaEnabled, setCaptchaEnabled]  = useState(true);
  const [captchaKey,     setCaptchaKey]      = useState("6Lc••••••••••••••••••••••••");
  const [ipWhitelist,    setIpWhitelist]     = useState("185.220.101.0/24\n195.148.127.0/24");

  // ── Features ──
  const [featureMap,     setFeatureMap]      = useState({
    requestMarketplace: true,
    reporterPortfolio:  true,
    liveFeeds:          true,
    subscriptions:      true,
    deviceRegistry:     true,
    aiTags:             false,
    bulkDownload:       true,
    apiAccess:          false,
  });

  // ── Limits ──
  const [maxReportagesPerDay, setMaxReportagesPerDay] = useState("50");
  const [maxUsersPerOrg,      setMaxUsersPerOrg]      = useState("20");
  const [trialDays,           setTrialDays]           = useState("14");
  const [freeStorageGb,       setFreeStorageGb]       = useState("5");

  const [activeTab,  setActiveTab]  = useState<"general"|"financial"|"email"|"storage"|"security"|"features"|"limits">("general");
  const [saved,      setSaved]      = useState(false);
  const [testEmailSent, setTestEmailSent] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const tabs: { key: typeof activeTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { key: "general",   label: "General",   icon: Settings },
    { key: "financial", label: "Financial", icon: DollarSign },
    { key: "email",     label: "Email/SMTP",icon: Mail },
    { key: "storage",   label: "Storage",   icon: Database },
    { key: "security",  label: "Security",  icon: Shield },
    { key: "features",  label: "Features",  icon: Zap },
    { key: "limits",    label: "Limits",    icon: Activity },
  ];

  const Toggle = ({ value, onChange, label, desc }: { value: boolean; onChange: (v: boolean) => void; label: string; desc?: string }) => (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {desc && <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>}
      </div>
      <button onClick={() => onChange(!value)}
        className={cn("relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
          value ? "bg-primary" : "bg-muted")}>
        <span className={cn("pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200",
          value ? "translate-x-4" : "translate-x-0")} />
      </button>
    </div>
  );

  const Field = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1">{label}</label>
      {desc && <p className="text-[11px] text-muted-foreground mb-1.5">{desc}</p>}
      {children}
    </div>
  );

  const Input = ({ value, onChange, placeholder, type = "text", mono = false }: {
    value: string; onChange: (v: string) => void; placeholder?: string; type?: string; mono?: boolean;
  }) => (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={cn("w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring",
        mono && "font-mono")} />
  );

  const Select = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) => (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <h3 className="text-sm font-semibold text-foreground border-b border-border pb-3">{title}</h3>
      {children}
    </div>
  );

  return (
    <Page title="Platform Settings" breadcrumbs={["Admin", "Platform", "Settings"]}>
      {/* Save bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-muted-foreground">Changes apply immediately across all platform services.</p>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium animate-pulse">
              <CheckCircle className="w-3.5 h-3.5" /> Saved
            </span>
          )}
          <Btn variant="primary" size="sm" icon={CheckCircle} onClick={save}>Save settings</Btn>
        </div>
      </div>

      {/* Maintenance banner */}
      {maintenance && (
        <div className="mb-5 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-red-700">Maintenance mode is ON</p>
            <p className="text-xs text-red-600">All public-facing pages are showing the maintenance message. Admin panel remains accessible.</p>
          </div>
          <Btn variant="outline" size="xs" onClick={() => setMaintenance(false)}>Disable</Btn>
        </div>
      )}

      <div className="flex gap-6">
        {/* Side nav */}
        <nav className="flex-shrink-0 w-44 space-y-0.5">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={cn("w-full flex items-center gap-2.5 px-3 h-9 rounded-lg text-sm font-medium transition-colors text-left",
                  activeTab === t.key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60")}>
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {t.label}
              </button>
            );
          })}
        </nav>

        {/* Panel */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* ── GENERAL ── */}
          {activeTab === "general" && <>
            <Section title="Site Identity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Site name"><Input value={siteName} onChange={setSiteName} /></Field>
                <Field label="Default language">
                  <Select value={defaultLang} onChange={setDefaultLang} options={[
                    { value: "en", label: "English" }, { value: "fr", label: "French" },
                    { value: "de", label: "German" }, { value: "es", label: "Spanish" },
                  ]} />
                </Field>
              </div>
              <Field label="Tagline">
                <Input value={siteTagline} onChange={setSiteTagline} placeholder="Short platform description" />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Default currency">
                  <Select value={defaultCurrency} onChange={setDefaultCurrency} options={[
                    { value: "USD", label: "USD — US Dollar" },
                    { value: "EUR", label: "EUR — Euro" },
                    { value: "GBP", label: "GBP — Pound Sterling" },
                  ]} />
                </Field>
                <Field label="Server timezone">
                  <Select value={timezone} onChange={setTimezone} options={[
                    { value: "UTC", label: "UTC" },
                    { value: "Europe/Paris", label: "Europe/Paris" },
                    { value: "America/New_York", label: "America/New_York" },
                    { value: "Asia/Tokyo", label: "Asia/Tokyo" },
                  ]} />
                </Field>
              </div>
            </Section>

            <Section title="Support Contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Support email"><Input value={supportEmail} onChange={setSupportEmail} type="email" /></Field>
                <Field label="Support phone"><Input value={supportPhone} onChange={setSupportPhone} /></Field>
              </div>
            </Section>

            <Section title="Maintenance Mode">
              <Toggle value={maintenance} onChange={setMaintenance}
                label="Enable maintenance mode"
                desc="Replaces public-facing pages with a maintenance message. Admin panel stays accessible." />
              {maintenance && (
                <Field label="Maintenance message">
                  <textarea value={maintenanceMsg} onChange={e => setMaintenanceMsg(e.target.value)} rows={3}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
                </Field>
              )}
            </Section>
          </>}

          {/* ── FINANCIAL ── */}
          {activeTab === "financial" && <>
            <Section title="Revenue & Fees">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Field label="Platform fee (%)" desc="Deducted from reporter payout on each order.">
                  <Input value={platformFee} onChange={setPlatformFee} type="number" />
                </Field>
                <Field label="VAT rate (%)" desc="Applied to buyer invoices where applicable.">
                  <Input value={vatRate} onChange={setVatRate} type="number" />
                </Field>
                <Field label="Escrow hold (hours)" desc="Hours funds are held in escrow after delivery accepted.">
                  <Input value={escrowHold} onChange={setEscrowHold} type="number" />
                </Field>
              </div>
            </Section>

            <Section title="Payouts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Minimum payout ($)" desc="Reporters must reach this balance before withdrawing.">
                  <Input value={minPayout} onChange={setMinPayout} type="number" />
                </Field>
                <Field label="Payout cycle">
                  <Select value={payoutCycle} onChange={v => setPayoutCycle(v as typeof payoutCycle)} options={[
                    { value: "weekly",    label: "Weekly (every Monday)" },
                    { value: "biweekly",  label: "Bi-weekly (1st & 15th)" },
                    { value: "monthly",   label: "Monthly (1st of month)" },
                  ]} />
                </Field>
              </div>
            </Section>

            <Section title="Stripe Integration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Secret key" desc="Keep this private. Never share or expose in front-end code.">
                  <div className="relative">
                    <Input value={stripeKey} onChange={setStripeKey} mono />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Field>
                <Field label="Webhook endpoint" desc="Receive payment events from Stripe.">
                  <Input value="https://api.godigimarket.io/webhooks/stripe" onChange={() => {}} mono />
                </Field>
              </div>
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <p className="text-xs text-emerald-700 font-medium">Stripe connection active — last webhook received 4 minutes ago</p>
              </div>
            </Section>
          </>}

          {/* ── EMAIL ── */}
          {activeTab === "email" && <>
            <Section title="SMTP Configuration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="SMTP host"><Input value={smtpHost} onChange={setSmtpHost} /></Field>
                <Field label="SMTP port"><Input value={smtpPort} onChange={setSmtpPort} type="number" /></Field>
                <Field label="Username"><Input value={smtpUser} onChange={setSmtpUser} mono /></Field>
                <Field label="Password / API key">
                  <div className="relative">
                    <Input value={smtpPass} onChange={setSmtpPass} type="password" mono />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Field>
              </div>
              <Toggle value={smtpTls} onChange={setSmtpTls} label="Enable TLS/STARTTLS" desc="Recommended for all production SMTP connections." />
            </Section>

            <Section title="Sender Identity">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="From name"><Input value={fromName} onChange={setFromName} /></Field>
                <Field label="From email address"><Input value={fromEmail} onChange={setFromEmail} type="email" /></Field>
              </div>
            </Section>

            <Section title="Test connection">
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[180px]">
                  <Field label="Send test email to">
                    <Input value="admin@godigimarket.io" onChange={() => {}} type="email" />
                  </Field>
                </div>
                <Btn variant="outline" size="sm" icon={Send} onClick={() => { setTestEmailSent(true); setTimeout(() => setTestEmailSent(false), 3000); }}>
                  Send test
                </Btn>
              </div>
              {testEmailSent && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <p className="text-xs text-emerald-700 font-medium">Test email sent successfully.</p>
                </div>
              )}
            </Section>
          </>}

          {/* ── STORAGE ── */}
          {activeTab === "storage" && <>
            <Section title="Upload Constraints">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Max file size (MB)" desc="Hard limit per individual file upload.">
                  <Input value={maxFileMb} onChange={setMaxFileMb} type="number" />
                </Field>
                <Field label="Free storage per reporter (GB)">
                  <Input value={freeStorageGb} onChange={setFreeStorageGb} type="number" />
                </Field>
              </div>
              <Field label="Allowed file formats" desc="Comma-separated extension list. Used for upload validation.">
                <Input value={allowedFormats} onChange={setAllowedFormats} mono />
              </Field>
            </Section>

            <Section title="Storage Provider">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {(["s3","gcs","r2"] as const).map(p => (
                  <button key={p} onClick={() => setStorageProvider(p)}
                    className={cn("p-3 rounded-lg border text-center transition-colors",
                      storageProvider === p ? "border-primary bg-primary/5" : "border-border hover:border-primary/40")}>
                    <div className="text-xs font-bold uppercase text-foreground">{p === "s3" ? "AWS S3" : p === "gcs" ? "GCS" : "Cloudflare R2"}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{p === "s3" ? "Amazon S3" : p === "gcs" ? "Google Cloud" : "Cloudflare"}</div>
                  </button>
                ))}
              </div>
              {storageProvider === "s3" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="S3 bucket name"><Input value={s3Bucket} onChange={setS3Bucket} mono /></Field>
                  <Field label="AWS region"><Input value={s3Region} onChange={setS3Region} mono /></Field>
                </div>
              )}
            </Section>

            <Section title="CDN">
              <Field label="CDN base URL" desc="Assets will be served from this URL prefix.">
                <Input value={cdnUrl} onChange={setCdnUrl} mono />
              </Field>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Total stored",    value: "4.2 TB" },
                  { label: "Bandwidth (mo.)", value: "890 GB" },
                  { label: "Objects",         value: "184,320" },
                ].map(s => (
                  <div key={s.label} className="bg-muted/40 rounded-lg p-3">
                    <div className="text-base font-bold text-foreground">{s.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </Section>
          </>}

          {/* ── SECURITY ── */}
          {activeTab === "security" && <>
            <Section title="Authentication">
              <Toggle value={mfaRequired} onChange={setMfaRequired}
                label="Require MFA for all admin accounts"
                desc="Admins must configure TOTP or hardware key before accessing the panel." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <Field label="Session duration (hours)" desc="Auto-logout after this period of inactivity.">
                  <Input value={sessionHours} onChange={setSessionHours} type="number" />
                </Field>
                <Field label="Max failed login attempts" desc="Account locked after this many consecutive failures.">
                  <Input value={maxLoginFails} onChange={setMaxLoginFails} type="number" />
                </Field>
              </div>
            </Section>

            <Section title="CAPTCHA">
              <Toggle value={captchaEnabled} onChange={setCaptchaEnabled}
                label="Enable reCAPTCHA on public forms"
                desc="Registration, login, contact forms." />
              {captchaEnabled && (
                <Field label="reCAPTCHA site key">
                  <div className="relative">
                    <Input value={captchaKey} onChange={setCaptchaKey} mono />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Field>
              )}
            </Section>

            <Section title="IP Allowlist">
              <Field label="Admin panel allowlist" desc="One CIDR range per line. Leave empty to allow all IPs.">
                <textarea value={ipWhitelist} onChange={e => setIpWhitelist(e.target.value)} rows={4}
                  className="w-full px-3 py-2 text-sm font-mono bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
              </Field>
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700">Ensure your own IP is included before saving, or you will be locked out.</p>
              </div>
            </Section>
          </>}

          {/* ── FEATURES ── */}
          {activeTab === "features" && (
            <Section title="Feature Flags">
              <p className="text-xs text-muted-foreground -mt-2 pb-2">Toggle platform features on or off globally. Changes take effect immediately without redeployment.</p>
              <div className="space-y-5">
                {(Object.entries(featureMap) as [keyof typeof featureMap, boolean][]).map(([key, val]) => {
                  const meta: Record<keyof typeof featureMap, { label: string; desc: string; badge?: string }> = {
                    requestMarketplace: { label: "Request Marketplace",  desc: "Buyers can commission field reportages from registered reporters.", badge: "Core" },
                    reporterPortfolio:  { label: "Reporter Portfolios",  desc: "Public-facing portfolio pages for verified reporters." },
                    liveFeeds:          { label: "Live News Feeds",      desc: "RSS/Atom feed aggregation and real-time display on the feeds map.", badge: "Core" },
                    subscriptions:      { label: "Subscriptions",        desc: "Allow buyers to purchase content subscription plans.", badge: "Revenue" },
                    deviceRegistry:     { label: "Device Registry",      desc: "Reporter devices registered and hash-verified on submission." },
                    aiTags:             { label: "AI Auto-tagging",       desc: "Use ML model to suggest taxonomy tags on upload.", badge: "Beta" },
                    bulkDownload:       { label: "Bulk Download",         desc: "Buyers can download all delivery files as a single ZIP." },
                    apiAccess:          { label: "Public API Access",     desc: "Third-party API key generation and access for buyers.", badge: "Beta" },
                  };
                  const m = meta[key];
                  return (
                    <div key={key} className={cn("flex items-start justify-between gap-4 p-4 rounded-lg border transition-colors",
                      val ? "border-border bg-card" : "border-dashed border-border bg-muted/20")}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-medium text-foreground">{m.label}</span>
                          {m.badge && (
                            <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-semibold",
                              m.badge === "Beta" ? "bg-amber-100 text-amber-700" :
                              m.badge === "Revenue" ? "bg-emerald-100 text-emerald-700" :
                              "bg-primary/10 text-primary")}>
                              {m.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{m.desc}</div>
                      </div>
                      <button onClick={() => setFeatureMap(prev => ({ ...prev, [key]: !val }))}
                        className={cn("relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200",
                          val ? "bg-primary" : "bg-muted")}>
                        <span className={cn("pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200",
                          val ? "translate-x-4" : "translate-x-0")} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* ── LIMITS ── */}
          {activeTab === "limits" && <>
            <Section title="Content Limits">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Max reportage submissions / reporter / day"
                  desc="Prevents spam submissions. Resets at midnight UTC.">
                  <Input value={maxReportagesPerDay} onChange={setMaxReportagesPerDay} type="number" />
                </Field>
                <Field label="Max users per organisation account"
                  desc="Applies to buyer org accounts.">
                  <Input value={maxUsersPerOrg} onChange={setMaxUsersPerOrg} type="number" />
                </Field>
              </div>
            </Section>

            <Section title="Trial & Free Tier">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Trial period (days)"
                  desc="New buyer accounts receive this many free trial days.">
                  <Input value={trialDays} onChange={setTrialDays} type="number" />
                </Field>
                <Field label="Free storage per reporter (GB)"
                  desc="Storage included in the free reporter tier.">
                  <Input value={freeStorageGb} onChange={setFreeStorageGb} type="number" />
                </Field>
              </div>
            </Section>

            <Section title="Rate Limiting">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "API requests / minute", value: "120" },
                  { label: "Webhook retries", value: "5" },
                  { label: "Search requests / minute", value: "60" },
                ].map(r => (
                  <Field key={r.label} label={r.label}>
                    <input defaultValue={r.value} type="number"
                      className="w-full h-9 px-3 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring" />
                  </Field>
                ))}
              </div>
            </Section>

            {/* Danger zone */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-red-700">Danger Zone</h3>
              <div className="flex items-center justify-between gap-4 py-3 border-b border-red-100">
                <div>
                  <div className="text-sm font-medium text-foreground">Clear all platform caches</div>
                  <div className="text-xs text-muted-foreground">Forces a full cache flush. May cause brief slowdown.</div>
                </div>
                <Btn variant="outline" size="sm" icon={RefreshCw}>Flush caches</Btn>
              </div>
              <div className="flex items-center justify-between gap-4 py-3 border-b border-red-100">
                <div>
                  <div className="text-sm font-medium text-foreground">Reset all feature flags to defaults</div>
                  <div className="text-xs text-muted-foreground">Disables all Beta flags; enables all Core flags.</div>
                </div>
                <Btn variant="outline" size="sm" icon={RefreshCw}>Reset flags</Btn>
              </div>
              <div className="flex items-center justify-between gap-4 pt-1">
                <div>
                  <div className="text-sm font-medium text-red-700">Wipe all test/demo data</div>
                  <div className="text-xs text-muted-foreground">Permanently removes all users, orders and content with the "demo" flag. Cannot be undone.</div>
                </div>
                <Btn variant="destructive" size="sm" icon={Trash2}>Wipe demo data</Btn>
              </div>
            </div>
          </>}

        </div>
      </div>
    </Page>
  );
}

// ── SCREEN: Stub ──────────────────────────────────────────────────────────────
function StubScreen({ title, breadcrumbs }: { title: string; breadcrumbs: string[] }) {
  return (
    <Page title={title} breadcrumbs={breadcrumbs}>
      <div className="bg-card border border-border rounded-lg p-12 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Layers className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground max-w-xs">
          This screen is part of the GoDigiMarket design system. Use the sidebar role switcher and navigation to explore all screens.
        </p>
      </div>
    </Page>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole]       = useState<Role>("admin");
  const [screen, setScreen]   = useState<Screen>("admin-dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileCtx = { open: mobileOpen, toggle: () => setMobileOpen(o => !o), close: () => setMobileOpen(false) };

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    const defaults: Record<Role, Screen> = {
      admin:    "admin-dashboard",
      reporter: "reporter-dashboard",
      customer: "customer-dashboard",
      public:   "marketplace",
    };
    setScreen(defaults[newRole]);
  };

  const renderScreen = () => {
    switch (screen) {
      case "design-system":       return <DesignSystemScreen />;
      // Auth (no sidebar)
      case "login":               return <LoginScreen onNavigate={setScreen} />;
      case "register":            return <RegisterScreen onNavigate={setScreen} />;
      case "reset-password":      return <ResetPasswordScreen onNavigate={setScreen} />;
      // Public
      case "marketplace":         return <MarketplaceScreen />;
      case "articles-list":       return <ArticlesListScreen onNavigate={setScreen} />;
      case "article-detail":      return <ArticleDetailScreen onNavigate={setScreen} />;
      case "cms-page":            return <CMSPageScreen />;
      case "reporters-map":       return <ReportersMapScreen onNavigate={setScreen} />;
      case "reporter-profile":    return <ReporterProfileScreen onNavigate={setScreen} />;
      case "reportages-map":      return <ReportagesMapScreen onNavigate={setScreen} />;
      case "reportage-detail":    return <ReportageDetailScreen onNavigate={setScreen} />;
      case "requests-map":        return <RequestsMapScreen onNavigate={setScreen} />;
      case "request-detail":      return <RequestDetailScreen />;
      case "feeds-map":           return <FeedsMapScreen onNavigate={setScreen} />;
      // Admin
      case "admin-dashboard":     return <AdminDashboardScreen onNavigate={setScreen} />;
      case "admin-users":         return <AdminUsersScreen onNavigate={setScreen} />;
      case "admin-user-detail":   return <AdminUserDetailScreen onNavigate={setScreen} />;
      case "admin-user-new":      return <AdminUserEditScreen onNavigate={setScreen} isNew />;
      case "admin-user-edit":        return <AdminUserEditScreen onNavigate={setScreen} />;
      case "admin-reporters-list":   return <AdminReportersListScreen onNavigate={setScreen} />;
      case "admin-reporter-detail":  return <AdminReporterDetailScreen onNavigate={setScreen} />;
      case "admin-subscriptions":    return <AdminSubscriptionsScreen onNavigate={setScreen} />;
      case "admin-devices":           return <AdminDevicesScreen />;
      case "admin-reportage-detail": return <AdminReportageDetailScreen onNavigate={setScreen} />;
      case "admin-transactions":  return <AdminTransactionsScreen />;
      case "admin-reportages":    return <AdminReportagesScreen onNavigate={setScreen} />;
      case "admin-deliveries":    return <AdminDeliveriesScreen onNavigate={setScreen} />;
      case "admin-requests":              return <AdminRequestsScreen onNavigate={setScreen} />;
      case "admin-request-detail":        return <AdminRequestDetailScreen onNavigate={setScreen} />;
      case "admin-disputes":              return <AdminDisputesScreen onNavigate={setScreen} />;
      case "admin-dispute-detail":        return <AdminDisputeDetailScreen onNavigate={setScreen} />;
      case "admin-settings":              return <AdminPlatformSettingsScreen />;
      case "admin-notifications":         return <AdminNotificationsScreen />;
      case "admin-transaction-detail":    return <AdminTransactionDetailScreen onNavigate={setScreen} />;
      case "admin-wallet-detail":         return <AdminWalletDetailScreen onNavigate={setScreen} />;
      case "admin-platform-earnings":     return <AdminPlatformEarningsScreen />;
      case "admin-user-activity":         return <AdminUserActivityScreen />;
      case "admin-withdrawals":           return <AdminWithdrawalsScreen />;
      case "admin-order-detail":          return <AdminOrderDetailScreen onNavigate={setScreen} />;
      case "admin-error-inbox":           return <AdminErrorInboxScreen />;
      case "admin-logging-errors":        return <AdminLoggingErrorsScreen />;
      case "admin-feeds":                 return <AdminFeedsScreen onNavigate={setScreen} />;
      case "admin-feed-sources":          return <AdminFeedSourcesScreen onNavigate={setScreen} />;
      case "admin-feed-source-entries":   return <AdminFeedSourceEntriesScreen onNavigate={setScreen} />;
      case "admin-feed-entry-detail":     return <AdminFeedEntryDetailScreen onNavigate={setScreen} />;
      case "admin-taxonomy-list":              return <AdminTaxonomyListScreen onNavigate={setScreen} />;
      case "admin-taxonomy-new":               return <AdminTaxonomyNewScreen onNavigate={setScreen} />;
      case "admin-cms-settings":               return <AdminCmsSettingsScreen onNavigate={setScreen} />;
      case "admin-cms-settings-history":       return <AdminCmsSettingsHistoryScreen onNavigate={setScreen} />;
      case "admin-cms-articles":               return <AdminCmsArticlesScreen onNavigate={setScreen} />;
      case "admin-cms-article-new":            return <AdminCmsArticleEditScreen onNavigate={setScreen} isNew />;
      case "admin-cms-article-edit":           return <AdminCmsArticleEditScreen onNavigate={setScreen} />;
      case "admin-cms-article-detail":         return <AdminCmsArticleDetailScreen onNavigate={setScreen} />;
      case "admin-cms-pages":                  return <AdminCmsPagesScreen onNavigate={setScreen} />;
      case "admin-cms-page-new":               return <AdminCmsPageEditScreen onNavigate={setScreen} isNew />;
      case "admin-cms-page-edit":              return <AdminCmsPageEditScreen onNavigate={setScreen} />;
      case "admin-cms-page-detail":            return <AdminCmsPageDetailScreen onNavigate={setScreen} />;
      case "admin-cms-menus":                  return <AdminCmsMenusScreen onNavigate={setScreen} />;
      case "admin-cms-menu-items":             return <AdminCmsMenuItemsScreen onNavigate={setScreen} />;
      case "admin-newsletters":               return <AdminNewslettersScreen onNavigate={setScreen} />;
      case "admin-newsletter-new":            return <AdminNewsletterEditScreen onNavigate={setScreen} isNew />;
      case "admin-newsletter-edit":           return <AdminNewsletterEditScreen onNavigate={setScreen} />;
      case "admin-newsletter-detail":         return <AdminNewsletterDetailScreen onNavigate={setScreen} />;
      // Reporter
      case "reporter-dashboard":          return <ReporterDashboardScreen />;
      case "reporter-reportages":         return <AdminReportagesScreen />;
      case "reporter-deliveries":         return <AdminDeliveriesScreen onNavigate={setScreen} />;
      case "reporter-requests":           return <RequestsMapScreen onNavigate={setScreen} />;
      case "reporter-request-responses":  return <ReporterRequestResponsesScreen onNavigate={setScreen} />;
      case "reporter-earnings":           return <ReporterEarningsScreen onNavigate={setScreen} />;
      case "reporter-devices":            return <ReporterDevicesScreen />;
      case "reporter-profile-edit":       return <ReporterProfileEditScreen />;
      case "reporter-portfolio":          return <ReporterPortfolioPhotoScreen onNavigate={setScreen} />;
      case "reporter-portfolio-photo":    return <ReporterPortfolioPhotoScreen onNavigate={setScreen} />;
      case "reporter-portfolio-video":    return <ReporterPortfolioVideoScreen onNavigate={setScreen} />;
      case "reporter-portfolio-audio":    return <ReporterPortfolioAudioScreen onNavigate={setScreen} />;
      case "create-reportage":            return <CreateReportageScreen onNavigate={setScreen} />;
      // Customer
      case "customer-dashboard":  return <CustomerDashboardScreen />;
      case "customer-purchases":  return <CustomerPurchasesScreen onNavigate={setScreen} />;
      case "customer-requests":   return <CustomerReportageRequestsScreen onNavigate={setScreen} />;
      case "customer-deliveries": return <CustomerDeliveryDetailScreen onNavigate={setScreen} />;
      // Shared authenticated
      case "wallet":                      return <WalletScreen />;
      case "delivery-detail":             return <DeliveryDetailScreen />;
      case "subscription-plans":          return <SubscriptionPlansScreen />;
      case "registered-dashboard":        return <RegisteredDashboardScreen onNavigate={setScreen} />;
      case "bookmarks":                   return <BookmarksScreen onNavigate={setScreen} />;
      case "notifications-list":          return <NotificationsListScreen onNavigate={setScreen} />;
      case "notification-detail":         return <NotificationDetailScreen onNavigate={setScreen} />;
      case "notification-preferences":    return <NotificationPreferencesScreen />;
      case "user-profile":                return <UserProfileScreen />;
      case "my-content-list":             return <MyContentListScreen onNavigate={setScreen} />;
      case "my-content-detail":           return <MyContentDetailScreen onNavigate={setScreen} />;
      default:                            return <StubScreen title="Screen" breadcrumbs={["GoDigiMarket"]} />;
    }
  };

  const isAuthScreen = screen === "login" || screen === "register" || screen === "reset-password";

  if (isAuthScreen) {
    return (
      <MobileMenuCtx.Provider value={mobileCtx}>
        <div className="min-h-screen bg-background">
          {renderScreen()}
        </div>
      </MobileMenuCtx.Provider>
    );
  }

  return (
    <MobileMenuCtx.Provider value={mobileCtx}>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar
          role={role}
          currentScreen={screen}
          onNavigate={setScreen}
          onRoleChange={handleRoleChange}
          collapsed={collapsed}
          onToggle={() => setCollapsed(c => !c)}
        />
        {/* Sidebar is fixed overlay on mobile, so main takes full width there */}
        <main className="flex-1 overflow-hidden flex flex-col min-w-0 w-full">
          {renderScreen()}
        </main>
      </div>
    </MobileMenuCtx.Provider>
  );
}
