const units = {
  milisaniye: {
    birim: 1,
    aliases: ["milisecond", "miliseconds", "ms", "milisaniye"],
  },
  saniye: {
    birim: 1000,
    aliases: ["sec", "sa", "sn", "s", "san", "seconds", "second", "saniye"],
  },

  dakika: {
    birim: 1000 * 60,
    aliases: ["d", "dak", "dk", "dakika", "minute", "minutes", "min"],
  },
  saat: {
    birim: 1000 * 60 * 60,
    aliases: ["saat", "st", "hour", "hours"],
  },
  gün: {
    birim: 1000 * 60 * 60 * 24,
    aliases: ["gün", "gun", "g", "day", "days"],
  },
  hafta: {
    birim: 1000 * 60 * 60 * 24 * 7,
    aliases: ["hafta", "h", "ha", "week", "weeks", "hft"],
  },
  ay: {
    birim: 1000 * 60 * 60 * 24 * 30,
    aliases: ["ay", "month", "mon"],
  },
  yıl: {
    birim: 1000 * 60 * 60 * 24 * 365.25,
    aliases: ["yıl", "y", "years", "year", "yl", "yil"],
  },
  yüzyıl: {
    birim: 1000 * 60 * 60 * 24 * 365.25 * 100,
    aliases: [
      "yuzyil",
      "yüzyil",
      "yuzyıl",
      "yüzyıl",
      "yy",
      "cen",
      "century",
      "asir",
      "asır",
    ],
  },
  milenyum: {
    birim: 1000 * 60 * 60 * 24 * 365.25 * 1000,
    aliases: ["milenyum", "mil", "binyıl", "binyil"],
  },
};

type Unit = {
  value: number;
  unit: keyof typeof units;
};
function ms(
  input: string,
  parse: true,
  forceFormat?: false | undefined
): Unit[];
function ms(
  input: number,
  parse: true,
  forceFormat?: false | undefined
): Unit[];
function ms(
  input: Unit[],
  parse: true,
  forceFormat?: false | undefined
): Unit[];
function ms(
  input: string,
  parse?: false | undefined,
  forceFormat?: false | undefined
): number;
function ms(
  input: Unit[],
  parse?: false | undefined,
  forceFormat?: false | undefined
): number;
function ms(
  input: number,
  parse?: false | undefined,
  forceFormat?: false | undefined
): string;
function ms(input: string, parse: boolean, forceFormat?: true): string;
function ms(input: number, parse: boolean, forceFormat?: true): string;
function ms(input: Unit[], parse: boolean, forceFormat?: true): string;
function ms(
  input: string | number | Unit[],
  parse: boolean = false,
  forceFormat: boolean = false
): string | number | Unit[] {
  let output: number = 0;
  let isNumber = false;
  if (typeof input === "number") {
    isNumber = true;
    output = input;
  } else if (typeof input == "string") {
    const parts = input.match(/-?\d*\.?\d+\s*[a-zA-Zğüşöçıİ]*/g) || [];
    const part = parts
      .map((part: string) => parseUnit(part.trim()))
      .filter((unit): unit is Unit => unit !== undefined);
    output = part.map(unitToMs).reduce((acc, num) => acc + num, 0);
  } else if (Array.isArray(input)) {
    output = input.map(unitToMs).reduce((acc, num) => acc + num, 0);
  } else return 0;

  const unit = msToUnit(output);
  if (isNumber || forceFormat)
    return unit.length !== 0
      ? unit.map((unit) => `${unit.value} ${unit.unit}`).join(" ")
      : `0 milisaniye`;
  if (parse) return unit;
  return output;
}
export = ms;

function msToUnit(ms: number): Unit[] {
  const unitsArray = Object.keys(units)
    .map((key) => ({
      unit: key,
      value: units[key as keyof typeof units].birim,
    }))
    .sort((a, b) => b.value - a.value);
  return unitsArray
    .map(({ unit, value }) => {
      const result = Math.floor(ms / value);
      ms -= result * value;
      if (result == 0) return undefined;
      return { value: result, unit: unit as keyof typeof units };
    })
    .filter(Boolean) as Unit[];
}
function unitToMs(unit: Unit) {
  const uni = unit.unit;
  if (!uni) return unit.value;
  return unit.value * units[uni].birim;
}
function parseUnit(str: string): Unit {
  let num = str.match(/-?\d*\.?\d+/)?.[0];
  let unit = str
    .replace(num || "", "")
    .trim()
    .toLowerCase();

  if (!num) return { value: 0, unit: "milisaniye" };
  let number = parseFloat(num);
  unit = unit.trim();

  for (const key in units) {
    if (units[key as keyof typeof units].aliases.some((u) => unit == u)) {
      return { value: number, unit: key as keyof typeof units };
    }
  }

  return { value: number, unit: "milisaniye" };
}
