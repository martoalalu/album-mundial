export type StickerKind = "team" | "general";

export type Sticker = {
  n: number;
  sectionId: string;
  sectionName: string;
  sectionColor: string;
  sectionFlag: string;
  confederation: string;
  kind: StickerKind;
  label: string;
};

export type Section = {
  id: string;
  name: string;
  color: string;
  flag: string;
  confederation: string;
  kind: StickerKind;
  stickers: Sticker[];
};

const TEAMS = [
  { code: "ARG", name: "Argentina",       color: "#75AADB", flag: "🇦🇷", confederation: "CONMEBOL" },
  { code: "BRA", name: "Brasil",          color: "#FFDF00", flag: "🇧🇷", confederation: "CONMEBOL" },
  { code: "URU", name: "Uruguay",         color: "#5CBFEB", flag: "🇺🇾", confederation: "CONMEBOL" },
  { code: "COL", name: "Colombia",        color: "#FCD116", flag: "🇨🇴", confederation: "CONMEBOL" },
  { code: "ECU", name: "Ecuador",         color: "#FFD100", flag: "🇪🇨", confederation: "CONMEBOL" },
  { code: "PAR", name: "Paraguay",        color: "#D52B1E", flag: "🇵🇾", confederation: "CONMEBOL" },
  { code: "USA", name: "Estados Unidos",  color: "#B22234", flag: "🇺🇸", confederation: "CONCACAF" },
  { code: "MEX", name: "México",          color: "#006847", flag: "🇲🇽", confederation: "CONCACAF" },
  { code: "CAN", name: "Canadá",          color: "#D80621", flag: "🇨🇦", confederation: "CONCACAF" },
  { code: "CRC", name: "Costa Rica",      color: "#002B7F", flag: "🇨🇷", confederation: "CONCACAF" },
  { code: "PAN", name: "Panamá",          color: "#005AA7", flag: "🇵🇦", confederation: "CONCACAF" },
  { code: "JAM", name: "Jamaica",         color: "#009B3A", flag: "🇯🇲", confederation: "CONCACAF" },
  { code: "FRA", name: "Francia",         color: "#0055A4", flag: "🇫🇷", confederation: "UEFA" },
  { code: "ESP", name: "España",          color: "#AA151B", flag: "🇪🇸", confederation: "UEFA" },
  { code: "ENG", name: "Inglaterra",      color: "#CE1124", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA" },
  { code: "GER", name: "Alemania",        color: "#1a1a1a", flag: "🇩🇪", confederation: "UEFA" },
  { code: "POR", name: "Portugal",        color: "#006600", flag: "🇵🇹", confederation: "UEFA" },
  { code: "ITA", name: "Italia",          color: "#0066CC", flag: "🇮🇹", confederation: "UEFA" },
  { code: "NED", name: "Países Bajos",    color: "#F36C21", flag: "🇳🇱", confederation: "UEFA" },
  { code: "BEL", name: "Bélgica",         color: "#ED2939", flag: "🇧🇪", confederation: "UEFA" },
  { code: "CRO", name: "Croacia",         color: "#CC0000", flag: "🇭🇷", confederation: "UEFA" },
  { code: "POL", name: "Polonia",         color: "#DC143C", flag: "🇵🇱", confederation: "UEFA" },
  { code: "SUI", name: "Suiza",           color: "#DA291C", flag: "🇨🇭", confederation: "UEFA" },
  { code: "DEN", name: "Dinamarca",       color: "#C8102E", flag: "🇩🇰", confederation: "UEFA" },
  { code: "AUT", name: "Austria",         color: "#ED2939", flag: "🇦🇹", confederation: "UEFA" },
  { code: "SRB", name: "Serbia",          color: "#C6363C", flag: "🇷🇸", confederation: "UEFA" },
  { code: "TUR", name: "Turquía",         color: "#E30A17", flag: "🇹🇷", confederation: "UEFA" },
  { code: "NOR", name: "Noruega",         color: "#BA0C2F", flag: "🇳🇴", confederation: "UEFA" },
  { code: "SWE", name: "Suecia",          color: "#006AA7", flag: "🇸🇪", confederation: "UEFA" },
  { code: "UKR", name: "Ucrania",         color: "#005BBB", flag: "🇺🇦", confederation: "UEFA" },
  { code: "MAR", name: "Marruecos",       color: "#C1272D", flag: "🇲🇦", confederation: "CAF" },
  { code: "SEN", name: "Senegal",         color: "#00853F", flag: "🇸🇳", confederation: "CAF" },
  { code: "EGY", name: "Egipto",          color: "#CE1126", flag: "🇪🇬", confederation: "CAF" },
  { code: "NGA", name: "Nigeria",         color: "#008751", flag: "🇳🇬", confederation: "CAF" },
  { code: "CIV", name: "Costa de Marfil", color: "#F77F00", flag: "🇨🇮", confederation: "CAF" },
  { code: "CMR", name: "Camerún",         color: "#007A5E", flag: "🇨🇲", confederation: "CAF" },
  { code: "GHA", name: "Ghana",           color: "#CE1126", flag: "🇬🇭", confederation: "CAF" },
  { code: "ALG", name: "Argelia",         color: "#006233", flag: "🇩🇿", confederation: "CAF" },
  { code: "TUN", name: "Túnez",           color: "#E70013", flag: "🇹🇳", confederation: "CAF" },
  { code: "JPN", name: "Japón",           color: "#BC002D", flag: "🇯🇵", confederation: "AFC" },
  { code: "KOR", name: "Corea del Sur",   color: "#003478", flag: "🇰🇷", confederation: "AFC" },
  { code: "AUS", name: "Australia",       color: "#00008B", flag: "🇦🇺", confederation: "AFC" },
  { code: "IRN", name: "Irán",            color: "#239F40", flag: "🇮🇷", confederation: "AFC" },
  { code: "KSA", name: "Arabia Saudita",  color: "#006C35", flag: "🇸🇦", confederation: "AFC" },
  { code: "QAT", name: "Qatar",           color: "#8A1538", flag: "🇶🇦", confederation: "AFC" },
  { code: "UZB", name: "Uzbekistán",      color: "#1EB53A", flag: "🇺🇿", confederation: "AFC" },
  { code: "JOR", name: "Jordania",        color: "#007A3D", flag: "🇯🇴", confederation: "AFC" },
  { code: "NZL", name: "Nueva Zelanda",   color: "#00247D", flag: "🇳🇿", confederation: "OFC" },
] as const;

function buildStickers(): Sticker[] {
  const list: Sticker[] = [];
  let n = 1;

  // 48 equipos × 20 = 960
  for (const team of TEAMS) {
    for (let i = 0; i < 20; i++) {
      const label =
        i === 0 ? "Escudo" : i === 1 ? "Foto grupal" : `Jugador ${i - 1}`;
      list.push({
        n,
        sectionId: team.code,
        sectionName: team.name,
        sectionColor: team.color,
        sectionFlag: team.flag,
        confederation: team.confederation,
        kind: "team",
        label,
      });
      n++;
    }
  }

  // 1 sección general × 20 = 20
  for (let i = 0; i < 20; i++) {
    list.push({
      n,
      sectionId: "GEN",
      sectionName: "General",
      sectionColor: "#D4AF37",
      sectionFlag: "★",
      confederation: "GENERAL",
      kind: "general",
      label: `General #${i + 1}`,
    });
    n++;
  }

  return list;
}

export const STICKERS: Sticker[] = buildStickers();
export const TOTAL_STICKERS = STICKERS.length; // 980

export const SECTIONS: Section[] = (() => {
  const map = new Map<string, Section>();
  for (const s of STICKERS) {
    if (!map.has(s.sectionId)) {
      map.set(s.sectionId, {
        id: s.sectionId,
        name: s.sectionName,
        color: s.sectionColor,
        flag: s.sectionFlag,
        confederation: s.confederation,
        kind: s.kind,
        stickers: [],
      });
    }
    map.get(s.sectionId)!.stickers.push(s);
  }
  return Array.from(map.values());
})();
