using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Saison")]
    public class SaisonModel
    {
        [Key]
        [Display(Name = "SA_Id")]
        public int Id { get; set; }

        [Display(Name = "SA_Libellé")]
        public string Libelle { get; set; }

        [Display(Name = "SA_DateDebut")]
        [DataType(DataType.Date)]
        public DateTime DateDebut { get; set; }

        [Display(Name = "SA_DateFin")]
        [DataType(DataType.Date)]
        public DateTime DateFin { get; set; }

        public List<TarifModel> Tarifs { get; set; }
    }
}