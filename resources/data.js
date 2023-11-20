"use strict";

const COMMON_CORE_CRYSTAL = 1.0;
const RARE_CORE_CRYSTAL = 1.5;
const LEGENDARY_CORE_CRYSTAL = 3.0;

const IDEA_BRAVERY = "Bravery";
const IDEA_TRUTH = "Truth";
const IDEA_COMPASSION = "Compassion";
const IDEA_JUSTICE = "Justice";

const PITY_GROUPS = [
    ["Godfrey", "Agate", "Boreas"],
    ["Perceval", "Azami", "Adenine"],
    ["Gorg", "Perun", "Electra"],
    ["Kora", "Nim", "Finch"],
    ["Floren", "Ursula", "Vale"]
];

const BladeData = [
    {Blade: "Godfrey",   Element: "Ice",       Idea: "Truth",       Rates: [0.63, 0.63, 1.25, 1.56, 2.19]},
    {Blade: "Perceval",  Element: "Dark",      Idea: "Justice",     Rates: [1.60, 0.25, 0.50, 1.00, 1.75]},
    {Blade: "Vale",      Element: "Dark",      Idea: "Justice",     Rates: [0.75, 0.25, 0.25, 0.25, 0.25]},
    {Blade: "Agate",     Element: "Earth",     Idea: "Compassion",  Rates: [0.25, 0.38, 0.75, 0.75, 0.13]},
    {Blade: "Gorg",      Element: "Water",     Idea: "Bravery",     Rates: [1.00, 1.00, 0.50, 1.50, 1.00]},
    {Blade: "Boreas",    Element: "Wind",      Idea: "Truth",       Rates: [0.25, 2.13, 2.13, 0.56, 1.19]},
    {Blade: "Dagas",     Element: "Fire",      Idea: "Bravery",     Rates: [0.50, 0.75, 0.50, 1.25, 0.50]},
    {Blade: "Perun",     Element: "Ice",       Idea: "Truth",       Rates: [2.44, 0.25, 0.63, 1.88, 1.06]},
    {Blade: "Kora",      Element: "Electric",  Idea: "Compassion",  Rates: [0.63, 1.88, 1.88, 0.31, 1.56]},
    {Blade: "Azami",     Element: "Dark",      Idea: "Justice",     Rates: [0.31, 1.88, 1.25, 0.63, 2.19]},
    {Blade: "Ursula",    Element: "Ice",       Idea: "Truth",       Rates: [2.25, 0.63, 1.25, 1.88, 0.25]},
    {Blade: "Newt",      Element: "Fire",      Idea: "Bravery",     Rates: [0.25, 0.25, 0.25, 0.25, 0.75]},
    {Blade: "Nim",       Element: "Earth",     Idea: "Compassion",  Rates: [1.00, 1.00, 1.75, 0.25, 1.00]},
    {Blade: "Adenine",   Element: "Wind",      Idea: "Truth",       Rates: [1.50, 0.25, 1.00, 1.75, 0.50]},
    {Blade: "Electra",   Element: "Electric",  Idea: "Compassion",  Rates: [1.88, 2.25, 0.63, 1.25, 0.25]},
    {Blade: "Zenobia",   Element: "Wind",      Idea: "Truth",       Rates: [0.25, 0.75, 0.25, 0.25, 0.25]},
    {Blade: "Finch",     Element: "Wind",      Idea: "Truth",       Rates: [0.50, 1.00, 1.75, 0.25, 1.50]},
    {Blade: "Floren",    Element: "Earth",     Idea: "Compassion",  Rates: [1.75, 1.50, 1.00, 0.50, 0.25]},
    {Blade: "KOS-MOS",   Element: "Light",     Idea: "Justice",     Rates: [0.10, 0.10, 0.10, 0.10, 0.10]},
    {Blade: "Dahlia",    Element: "Ice",       Idea: "Truth",       Rates: [0.13, 0.50, 0.25, 0.88, 0.75]},
    //req final boss
    {Blade: "T-elos",    Element: "Dark",      Idea: "Justice",     Rates: [5.00, 5.00, 5.00, 5.00, 5.00]},
    //req ng+
    {Blade: "Akhos",     Element: "Electric",  Idea: "Compassion",  Rates: [0.25, 0.25, 0.25, 0.25, 0.25]},
    {Blade: "Patroka",   Element: "Earth",     Idea: "Compassion",  Rates: [0.25, 0.25, 0.25, 0.25, 0.25]},
    {Blade: "Obrona",    Element: "Electric",  Idea: "Compassion",  Rates: [0.50, 0.50, 0.50, 0.50, 0.50]},
    {Blade: "Perdido",   Element: "Fire",      Idea: "Bravery",     Rates: [0.50, 0.50, 0.50, 0.50, 0.50]},
    {Blade: "Cressidus", Element: "Earth",     Idea: "Compassion",  Rates: [0.50, 0.50, 0.50, 0.50, 0.50]},
    {Blade: "Sever",     Element: "Wind",      Idea: "Truth",       Rates: [0.50, 0.50, 0.50, 0.50, 0.50]}
];