using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Formule")]
    public class FormuleModel
    {
        [Key]
        [Display(Name = "FOR_Id")]
        public int Id { get; set; }

        [Display(Name = "FOR_Libelle")]
        public string Libelle { get; set; }

        [Display(Name = "FOR_Montant")]
        public decimal Montant { get; set; }

        public ICollection<HotelFormuleModel> HotelFormules { get; set; }
    }
}