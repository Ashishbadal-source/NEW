import { Alert } from "@/types";

export const alertsData: Alert[] = [
  {
    id: "alert-001",
    mineId: "mine-12",
    cellId: "c_123",
    type: "slope_instability",
    severity: "Critical",
    message:
      "Critical displacement detected in North Wall sector. Immediate action required.",
    createdBy: "ml_service",
    createdAt: new Date(),
    acknowledgedBy: undefined,
    acknowledgedAt: undefined,
  },
  {
    id: "alert-002",
    mineId: "mine-12",
    cellId: "c_124",
    type: "sensor_anomaly",
    severity: "High",
    message: "Increased strain readings on East Terrace. Monitor closely.",
    createdBy: "ml_service",
    createdAt: new Date(),
  },
  // add others similarly
];
