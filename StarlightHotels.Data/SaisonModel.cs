using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Saison")]
    public class SaisonModel
    {
        [Key]
        [Column("SA_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("SA_Libellé")]
        [Display(Name = "Libellé")]
        public string Libelle { get; set; }

        [Column("SA_DateDebut")]
        [Display(Name = "Date de début")]
        [DataType(DataType.Date)]
        public DateTime DateDebut { get; set; }

        [Column("SA_DateFin")]
        [Display(Name = "Date de fin")]
        [DataType(DataType.Date)]
        public DateTime DateFin { get; set; }

        public List<TarifModel> Tarifs { get; set; }
    }
}