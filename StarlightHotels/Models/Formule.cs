using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Formule")]
    public class Formule
    {
        [Key]
        [Display(Name = "FOR_Id")]
        public int Id { get; set; }

        [Display(Name = "FOR_Libelle")]
        public string Libelle { get; set; }

        [Display(Name = "FOR_Montant")]
        public decimal Montant { get; set; }

        public ICollection<HotelFormule> HotelFormules { get; set; }
    }
}