using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Formule")]
    public class FormuleModel
    {
        [Key]
        [Column("FOR_Id")]
        [Display(Name = "FOR_Id")]
        public int Id { get; set; }

        [Column("FOR_Libelle")]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; }

        [Column("FOR_Montant")]
        [Display(Name = "Prix")]
        [DataType(DataType.Currency)]
        public decimal Montant { get; set; }

        public List<ChambreReserveeModel> ChambreReservees { get; set; }

        public ICollection<HotelFormuleModel> HotelFormules { get; set; }
    }
}