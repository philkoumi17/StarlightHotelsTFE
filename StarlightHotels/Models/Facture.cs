using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarmaniaHotels.API.Models
{
    [Table(name:"Facture")]
    public class Facture
    {
        [Key]
        [Display(Name = "FAC_Id")]
        public int Id { get; set; }

        [Required]
        [Display(Name = "FAC_Date")]
        [DataType(DataType.Date)]
        public DateTime DateFacture { get; set; }

        [Required]
        [Display(Name = "FAC_MontantTotal")]
        public decimal MontantTotal { get; set; }

        public int ResId { get; set; }
        public Reservation Reservation { get; set; }
    }
}