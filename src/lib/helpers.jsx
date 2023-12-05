/*
* Am facut functia mai jos pentru a putea repara requstul de wikipedia. (ca la dacie, cu sarma)
* in mod normal ar trebui sa avem baza de date cu orasele noastre scrisa frumos..
*/

export function formatCityNameCuSarma(input) {
    const cityMappings = {
        "targu-mures": "Târgu_Mureș",
        "targumures": "Târgu_Mureș",
        "sibiu": "Sibiu"
      };
    const formattedInput = input.toLowerCase().replace(/-/g, '');
    return cityMappings[formattedInput] || "Orașul nu a fost găsit.";
  }
