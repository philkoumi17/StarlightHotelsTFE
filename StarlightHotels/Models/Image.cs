using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StarmaniaHotels.API.Models
{
    public class Image
    {
        [Key]
        [Display(Name = "IM_Id")]
        public int Id { get; set; }

        [Display(Name = "IM_Image")]
        [DataType(DataType.ImageUrl)]
        [StringLength(255)]
        public string ImageUrl { get; set; }

        public int HotelId { get; set; }
        public Hotel Hotel { get; set; }
    }
}