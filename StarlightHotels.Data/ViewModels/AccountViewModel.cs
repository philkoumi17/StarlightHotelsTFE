using System;

namespace StarlightHotels.Models.ViewModels
{
    public class AccountViewModel
    {
        public string Nom { get; set; }

        public string Prenom { get; set; }

        public DateTime DateNaissance { get; set; }

        public string Sexe { get; set; }

        public string NumeroRue { get; set; }

        public string Rue { get; set; }

        public string CodePostal { get; set; }

        public string Ville { get; set; }

        public int PaysId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        // public string Role { get; set; }
    }
}