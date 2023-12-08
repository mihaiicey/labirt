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

export function calculateAverageRating(reviews){
  if (!reviews || reviews.length === 0) return 0; // Verifică dacă există recenzii

  const total = reviews.reduce((acc, review) => acc + review.rating, 0); // Suma ratingurilor
  return total / reviews.length; // Media ratingurilor
};

export function formatDateHumanReadable(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('ro-RO', options);
}