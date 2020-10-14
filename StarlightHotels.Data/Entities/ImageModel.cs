using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Core.Entities
{
    [Table("Image")]
    public class ImageModel
    {
        [Key]
        [Column("IM_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("IM_Image")]
        [Display(Name = "Url")]
        [DataType(DataType.ImageUrl)]
        [StringLength(255)]
        public string ImageUrl { get; set; }

        [Column("IM_HOTEL_Id")]
        [Display(Name = "Hotel")]
        public int HotelId { get; set; }
        public HotelModel Hotel { get; set; }
    }
}