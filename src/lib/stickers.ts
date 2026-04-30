export type StickerKind = "team" | "general";

export type Sticker = {
  n: number;
  sectionId: string;
  sectionName: string;
  sectionColor: string;
  sectionFlag: string;
  confederation: string;
  wcGroup: string;
  kind: StickerKind;
  label: string;
};

export type Section = {
  id: string;
  name: string;
  color: string;
  flag: string;
  confederation: string;
  wcGroup: string;
  kind: StickerKind;
  stickers: Sticker[];
};

// 48 equipos ordenados por grupo A-L
const TEAMS = [
  // Grupo A
  { code: "MEX", name: "México",           color: "#006847", flag: "🇲🇽", confederation: "CONCACAF", wcGroup: "A" },
  { code: "ZAF", name: "Sudáfrica",        color: "#007A4D", flag: "🇿🇦", confederation: "CAF",      wcGroup: "A" },
  { code: "KOR", name: "Corea del Sur",    color: "#003478", flag: "🇰🇷", confederation: "AFC",      wcGroup: "A" },
  { code: "CZE", name: "República Checa",  color: "#D7141A", flag: "🇨🇿", confederation: "UEFA",     wcGroup: "A" },
  // Grupo B
  { code: "CAN", name: "Canadá",           color: "#D80621", flag: "🇨🇦", confederation: "CONCACAF", wcGroup: "B" },
  { code: "BIH", name: "Bosnia-Herzegovina",color:"#002395", flag: "🇧🇦", confederation: "UEFA",     wcGroup: "B" },
  { code: "QAT", name: "Qatar",            color: "#8A1538", flag: "🇶🇦", confederation: "AFC",      wcGroup: "B" },
  { code: "SUI", name: "Suiza",            color: "#DA291C", flag: "🇨🇭", confederation: "UEFA",     wcGroup: "B" },
  // Grupo C
  { code: "BRA", name: "Brasil",           color: "#009C3B", flag: "🇧🇷", confederation: "CONMEBOL", wcGroup: "C" },
  { code: "MAR", name: "Marruecos",        color: "#C1272D", flag: "🇲🇦", confederation: "CAF",      wcGroup: "C" },
  { code: "HAI", name: "Haití",            color: "#00209F", flag: "🇭🇹", confederation: "CONCACAF", wcGroup: "C" },
  { code: "SCO", name: "Escocia",          color: "#003087", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", confederation: "UEFA",     wcGroup: "C" },
  // Grupo D
  { code: "USA", name: "Estados Unidos",   color: "#B22234", flag: "🇺🇸", confederation: "CONCACAF", wcGroup: "D" },
  { code: "PAR", name: "Paraguay",         color: "#D52B1E", flag: "🇵🇾", confederation: "CONMEBOL", wcGroup: "D" },
  { code: "AUS", name: "Australia",        color: "#00008B", flag: "🇦🇺", confederation: "AFC",      wcGroup: "D" },
  { code: "TUR", name: "Turquía",          color: "#E30A17", flag: "🇹🇷", confederation: "UEFA",     wcGroup: "D" },
  // Grupo E
  { code: "GER", name: "Alemania",         color: "#1a1a1a", flag: "🇩🇪", confederation: "UEFA",     wcGroup: "E" },
  { code: "CUW", name: "Curazao",          color: "#003DA5", flag: "🇨🇼", confederation: "CONCACAF", wcGroup: "E" },
  { code: "CIV", name: "Costa de Marfil",  color: "#F77F00", flag: "🇨🇮", confederation: "CAF",      wcGroup: "E" },
  { code: "ECU", name: "Ecuador",          color: "#FFD100", flag: "🇪🇨", confederation: "CONMEBOL", wcGroup: "E" },
  // Grupo F
  { code: "NED", name: "Países Bajos",     color: "#F36C21", flag: "🇳🇱", confederation: "UEFA",     wcGroup: "F" },
  { code: "JPN", name: "Japón",            color: "#BC002D", flag: "🇯🇵", confederation: "AFC",      wcGroup: "F" },
  { code: "SWE", name: "Suecia",           color: "#006AA7", flag: "🇸🇪", confederation: "UEFA",     wcGroup: "F" },
  { code: "TUN", name: "Túnez",            color: "#E70013", flag: "🇹🇳", confederation: "CAF",      wcGroup: "F" },
  // Grupo G
  { code: "BEL", name: "Bélgica",          color: "#ED2939", flag: "🇧🇪", confederation: "UEFA",     wcGroup: "G" },
  { code: "EGY", name: "Egipto",           color: "#CE1126", flag: "🇪🇬", confederation: "CAF",      wcGroup: "G" },
  { code: "IRN", name: "Irán",             color: "#239F40", flag: "🇮🇷", confederation: "AFC",      wcGroup: "G" },
  { code: "NZL", name: "Nueva Zelanda",    color: "#00247D", flag: "🇳🇿", confederation: "OFC",      wcGroup: "G" },
  // Grupo H
  { code: "ESP", name: "España",           color: "#AA151B", flag: "🇪🇸", confederation: "UEFA",     wcGroup: "H" },
  { code: "CPV", name: "Cabo Verde",       color: "#003893", flag: "🇨🇻", confederation: "CAF",      wcGroup: "H" },
  { code: "KSA", name: "Arabia Saudita",   color: "#006C35", flag: "🇸🇦", confederation: "AFC",      wcGroup: "H" },
  { code: "URU", name: "Uruguay",          color: "#5CBFEB", flag: "🇺🇾", confederation: "CONMEBOL", wcGroup: "H" },
  // Grupo I
  { code: "FRA", name: "Francia",          color: "#0055A4", flag: "🇫🇷", confederation: "UEFA",     wcGroup: "I" },
  { code: "SEN", name: "Senegal",          color: "#00853F", flag: "🇸🇳", confederation: "CAF",      wcGroup: "I" },
  { code: "IRQ", name: "Irak",             color: "#CE1126", flag: "🇮🇶", confederation: "AFC",      wcGroup: "I" },
  { code: "NOR", name: "Noruega",          color: "#BA0C2F", flag: "🇳🇴", confederation: "UEFA",     wcGroup: "I" },
  // Grupo J
  { code: "ARG", name: "Argentina",        color: "#75AADB", flag: "🇦🇷", confederation: "CONMEBOL", wcGroup: "J" },
  { code: "ALG", name: "Argelia",          color: "#006233", flag: "🇩🇿", confederation: "CAF",      wcGroup: "J" },
  { code: "AUT", name: "Austria",          color: "#ED2939", flag: "🇦🇹", confederation: "UEFA",     wcGroup: "J" },
  { code: "JOR", name: "Jordania",         color: "#007A3D", flag: "🇯🇴", confederation: "AFC",      wcGroup: "J" },
  // Grupo K
  { code: "POR", name: "Portugal",         color: "#006600", flag: "🇵🇹", confederation: "UEFA",     wcGroup: "K" },
  { code: "COD", name: "RD Congo",         color: "#007FFF", flag: "🇨🇩", confederation: "CAF",      wcGroup: "K" },
  { code: "UZB", name: "Uzbekistán",       color: "#1EB53A", flag: "🇺🇿", confederation: "AFC",      wcGroup: "K" },
  { code: "COL", name: "Colombia",         color: "#FCD116", flag: "🇨🇴", confederation: "CONMEBOL", wcGroup: "K" },
  // Grupo L
  { code: "ENG", name: "Inglaterra",       color: "#CE1124", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA",     wcGroup: "L" },
  { code: "CRO", name: "Croacia",          color: "#CC0000", flag: "🇭🇷", confederation: "UEFA",     wcGroup: "L" },
  { code: "GHA", name: "Ghana",            color: "#CE1126", flag: "🇬🇭", confederation: "CAF",      wcGroup: "L" },
  { code: "PAN", name: "Panamá",           color: "#005AA7", flag: "🇵🇦", confederation: "CONCACAF", wcGroup: "L" },
] as const;

function buildStickers(): Sticker[] {
  const list: Sticker[] = [];
  let n = 1;

  // 48 equipos × 20 = 960 (ordenados por grupo A-L)
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
        wcGroup: team.wcGroup,
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
      wcGroup: "-",
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
        wcGroup: s.wcGroup,
        kind: s.kind,
        stickers: [],
      });
    }
    map.get(s.sectionId)!.stickers.push(s);
  }
  return Array.from(map.values());
})();

export const WC_GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'] as const;
export type WCGroup = typeof WC_GROUPS[number];
