// Superscore calculation algorithm
// Score range: 0-100

interface ScoreInput {
  totalComplaints: number;
  resolvedComplaints: number;
  avgResponseTimeHours: number | null;
  avgRating: number | null;
  documentVerificationRate: number; // 0-1
  industryAvgComplaints: number;
}

interface ScoreBreakdown {
  resolutionRate: number;
  responseTimeScore: number;
  ratingScore: number;
  volumeScore: number;
  verificationScore: number;
  total: number;
}

const WEIGHTS = {
  resolutionRate: 0.30,
  responseTime: 0.25,
  customerRating: 0.25,
  complaintVolume: 0.10,
  documentVerification: 0.10,
};

export function calculateSuperscore(input: ScoreInput): ScoreBreakdown {
  // 1. Resolution rate (30%) - higher is better
  const resolutionRate =
    input.totalComplaints > 0
      ? (input.resolvedComplaints / input.totalComplaints) * 100
      : 50; // neutral for new brands

  // 2. Response time (25%) - lower is better
  let responseTimeScore = 50;
  if (input.avgResponseTimeHours !== null) {
    if (input.avgResponseTimeHours <= 2) responseTimeScore = 100;
    else if (input.avgResponseTimeHours <= 6) responseTimeScore = 90;
    else if (input.avgResponseTimeHours <= 12) responseTimeScore = 80;
    else if (input.avgResponseTimeHours <= 24) responseTimeScore = 70;
    else if (input.avgResponseTimeHours <= 48) responseTimeScore = 50;
    else if (input.avgResponseTimeHours <= 72) responseTimeScore = 30;
    else responseTimeScore = 10;
  }

  // 3. Customer rating (25%) - scale from 1-5 to 0-100
  const ratingScore = input.avgRating !== null ? (input.avgRating / 5) * 100 : 50;

  // 4. Complaint volume relative to industry (10%) - lower is better
  let volumeScore = 50;
  if (input.industryAvgComplaints > 0 && input.totalComplaints > 0) {
    const ratio = input.totalComplaints / input.industryAvgComplaints;
    if (ratio <= 0.5) volumeScore = 100;
    else if (ratio <= 0.8) volumeScore = 80;
    else if (ratio <= 1.0) volumeScore = 60;
    else if (ratio <= 1.5) volumeScore = 40;
    else volumeScore = 20;
  }

  // 5. Document verification rate (10%)
  const verificationScore = input.documentVerificationRate * 100;

  // Weighted total
  const total = Math.round(
    resolutionRate * WEIGHTS.resolutionRate +
    responseTimeScore * WEIGHTS.responseTime +
    ratingScore * WEIGHTS.customerRating +
    volumeScore * WEIGHTS.complaintVolume +
    verificationScore * WEIGHTS.documentVerification
  );

  return {
    resolutionRate: Math.round(resolutionRate),
    responseTimeScore: Math.round(responseTimeScore),
    ratingScore: Math.round(ratingScore),
    volumeScore: Math.round(volumeScore),
    verificationScore: Math.round(verificationScore),
    total: Math.min(100, Math.max(0, total)),
  };
}
