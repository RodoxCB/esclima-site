import {
  Award,
  BadgeCheck,
  Gauge,
  Settings,
  Shield,
  Sparkles,
  Wrench as Tool,
  Wind,
  Wrench,
  Zap,
  type LucideIcon
} from "lucide-react";

export const serviceIconMap: Record<string, LucideIcon> = {
  wind: Wind,
  wrench: Wrench,
  settings: Settings,
  sparkles: Sparkles,
  gauge: Gauge
};

export const differentialIconMap: Record<string, LucideIcon> = {
  zap: Zap,
  "badge-check": BadgeCheck,
  shield: Shield,
  tool: Tool,
  award: Award
};

export function getServiceIcon(name: string): LucideIcon {
  return serviceIconMap[name] ?? Wind;
}

export function getDifferentialIcon(name: string): LucideIcon {
  return differentialIconMap[name] ?? Zap;
}
