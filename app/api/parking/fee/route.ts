import { NextResponse } from "next/server";

function toIST(date: Date) {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000;
  return new Date(date.getTime() + IST_OFFSET);
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const vehicle = url.searchParams.get("vehicle");
    const timeParam = url.searchParams.get("time");

    if (!vehicle || !timeParam) {
      return NextResponse.json(
        { error: "Missing vehicle or time" },
        { status: 400 }
      );
    }

    // Parse entry time from QR (HH:MM:SS, local)
    const [h, m, s = 0] = timeParam.split(":").map(Number);
    if ([h, m].some(isNaN)) {
      return NextResponse.json(
        { error: "Invalid time format" },
        { status: 400 }
      );
    }

    // Get current UTC time and convert to IST
    const nowUtc = new Date();
    const nowIst = toIST(nowUtc);

    // Create entry time in IST (same date)
    const entryIst = new Date(nowIst);
    entryIst.setHours(h, m, s, 0);
    if (entryIst > nowIst) entryIst.setDate(entryIst.getDate() - 1); // handle past midnight

    const diffMs = nowIst.getTime() - entryIst.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const diffHours = diffMs / (1000 * 60 * 60);

    const amount = diffHours <= 1 ? 25 : Math.ceil(diffHours) * 25;

    return NextResponse.json({
      vehicle,
      entryTime: entryIst.toISOString(),
      serverTimeIST: nowIst.toISOString(),
      duration: { hours, minutes },
      amount,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
