// src/hooks/useCatalog.ts
import { useQuery } from "@tanstack/react-query";
import {
  getMissions,
  getStructures,
  getDiscoveries,
  getMoonData,
  getOrbitData,
} from "@/api";

export function useMissions() {
  return useQuery({
    queryKey: ["missions"],
    queryFn: getMissions,
  });
}

export function useStructures() {
  return useQuery({
    queryKey: ["structures"],
    queryFn: () => getStructures(),
  });
}

export function useDiscoveries() {
  return useQuery({
    queryKey: ["discoveries"],
    queryFn: getDiscoveries,
  });
}

export function useMoons() {
  return useQuery({
    queryKey: ["moons"],
    queryFn: getMoonData,
  });
}

export function useOrbitData() {
  return useQuery({
    queryKey: ["orbit"],
    queryFn: getOrbitData,
  });
}
