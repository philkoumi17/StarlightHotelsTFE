using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StarmaniaHotels.API.Models;

namespace StarlightHotels.API.Models
{
    public class HotelChainContext : IdentityDbContext<ApplicationUser>
    {
        public HotelChainContext(DbContextOptions options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Gestion pour la table HotelCategorie
            modelBuilder.Entity<HotelCategorie>()
                .HasKey(ht => new { ht.HotelId, ht.CatId });

            modelBuilder.Entity<HotelCategorie>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelCategories)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelCategorie>()
                .HasOne(pt => pt.Categorie)
                .WithMany(t => t.HotelCategories)
                .HasForeignKey(pt => pt.CatId);

            // Gestion pour la table HotelFormule
            modelBuilder.Entity<HotelFormule>()
                .HasKey(hf => new { hf.HotelId, hf.FormId });

            modelBuilder.Entity<HotelFormule>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelFormules)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelFormule>()
                .HasOne(pt => pt.Formule)
                .WithMany(t => t.HotelFormules)
                .HasForeignKey(pt => pt.FormId);

            // Gestion pour la table HotelService
            modelBuilder.Entity<HotelService>()
                .HasKey(hs => new { hs.HotelId, hs.ServId });

            modelBuilder.Entity<HotelService>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelServices)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelService>()
                .HasOne(pt => pt.Service)
                .WithMany(t => t.HotelServices)
                .HasForeignKey(pt => pt.ServId);

            // Gestion pour la table HotelTheme
            modelBuilder.Entity<HotelTheme>()
                .HasKey(ht => new { ht.HotelId, ht.ThemeId });

            modelBuilder.Entity<HotelTheme>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelThemes)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelTheme>()
                .HasOne(pt => pt.Theme)
                .WithMany(t => t.HotelThemes)
                .HasForeignKey(pt => pt.ThemeId);

            // Gestion pour la table ChambreReservee
            modelBuilder.Entity<ChambreReservee>()
                .HasKey(ht => new { ht.ChNum, ht.IdRes });

            modelBuilder.Entity<ChambreReservee>()
                .HasOne(pt => pt.Chambre)
                .WithMany(t => t.ChambreReservees)
                .HasForeignKey(pt => pt.ChNum);

            modelBuilder.Entity<ChambreReservee>()
                .HasOne(pt => pt.Reservation)
                .WithMany(p => p.ChambreReservees)
                .HasForeignKey(pt => pt.IdRes)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // Autres relations
            modelBuilder.Entity<Reservation>()
                .HasOne(a => a.Facture)
                .WithOne(b => b.Reservation)
                .HasForeignKey<Facture>(b => b.ResId);

            modelBuilder.Entity<Client>()
                .HasOne(a => a.Reservation)
                .WithOne(b => b.Client)
                .HasForeignKey<Reservation>(b => b.ClientId);

            modelBuilder.Entity<Participant>()
                .HasOne(a => a.Reservation)
                .WithOne(b => b.Participant)
                .HasForeignKey<Reservation>(b => b.PartId);
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Categorie> Categories { get; set; }
        public DbSet<Chambre> Chambres { get; set; }
        public DbSet<ChambreReservee> ChambreReservees { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Etat> Etats { get; set; }
        public DbSet<Facture> Factures { get; set; }
        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<HotelCategorie> HotelCategories { get; set; }
        public DbSet<HotelFormule> HotelFormules { get; set; }
        public DbSet<HotelService> HotelServices { get; set; }
        public DbSet<HotelTheme> HotelThemes { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Pays> Pays { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ChambreReservee> ReservationChambres { get; set; }
        public DbSet<Saison> Saisons { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Tarif> Tarifs { get; set; }
        public DbSet<Theme> Themes { get; set; }
    }
}