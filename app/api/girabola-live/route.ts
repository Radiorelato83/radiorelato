
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const API_URL =
  "https://www.ligaunitelgirabola.com/api/ancaf?format=matches";

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `A API do Girabola respondeu com o estado ${response.status}.`,
      );
    }

    const data = (await response.json()) as {
      matches?: unknown[];
    };

    if (!Array.isArray(data.matches)) {
      throw new Error(
        "A API não devolveu uma lista válida de jogos.",
      );
    }

    return NextResponse.json(
      {
        matches: data.matches,
        updatedAt: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  } catch (error) {
    console.error(
      "Erro ao consultar os resultados do Girabola:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível actualizar os resultados do Girabola.",
      },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
}
