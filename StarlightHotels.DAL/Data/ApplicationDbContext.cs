using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Core.Entities;

namespace StarlightHotels.DAL.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region Table Key
            modelBuilder.Entity<HotelModel>()
                .HasKey(ht => new { ht.Id });

            modelBuilder.Entity<HotelPromotionModel>()
                .HasKey(hp => new { hp.HotelId, hp.PromotionId });

            modelBuilder.Entity<PromotionModel>()
                .HasKey(p => new { p.Id });

            modelBuilder.Entity<HotelThemeModel>()
                .HasKey(ht => new { ht.HotelId, ht.ThemeId });

            modelBuilder.Entity<ThemeModel>()
                .HasKey(t => new {t.Id });

            modelBuilder.Entity<ImageModel>()
                .HasKey(i => new { i.Id });

            modelBuilder.Entity<HotelFormuleModel>()
                .HasKey(hf => new { hf.HotelId, hf.FormuleId });

            modelBuilder.Entity<FormuleModel>()
                .HasKey(i => new { i.Id });

            modelBuilder.Entity<HotelCategorieModel>()
                .HasKey(ht => new { ht.HotelId, ht.CategorieId });

            modelBuilder.Entity<CategorieModel>()
                .HasKey(i => new { i.Id });

            modelBuilder.Entity<TarifModel>()
                .HasKey(i => new { i.Id });

            modelBuilder.Entity<SaisonModel>()
                .HasKey(i => new { i.Id });

            modelBuilder.Entity<ChambreModel>()
                .HasKey(c => new { c.ChNum });

            modelBuilder.Entity<ChambreReserveeModel>()
                .HasKey(c => new { c.IdResCh });

            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasKey(hp => new { hp.ChambreReserveeId, hp.ServiceId });

            modelBuilder.Entity<PaysModel>()
                .HasKey(p => new { p.Id});

            modelBuilder.Entity<HotelServiceModel>()
                .HasKey(hs => new { hs.HotelId, hs.ServiceId });

            modelBuilder.Entity<EtatModel>()
                .HasKey(p => new { p.Id });

            modelBuilder.Entity<ReservationModel>()
                .HasKey(r => new { r.IdRes });

            modelBuilder.Entity<ParticipantModel>()
                .HasKey(p => new { p.Id });

            modelBuilder.Entity<ParticipantReservationModel>()
               .HasKey(pr => new { pr.ParticipantId, pr.ReservationId });

            modelBuilder.Entity<FactureModel>()
                .HasKey(f => new { f.Id });

            #endregion


            #region Many-to-many relationships
            
            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Promotion)
                .WithMany(t => t.HotelPromotions)
                .HasForeignKey(pt => pt.PromotionId);

            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(t => t.HotelPromotions)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelCategories)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Categorie)
                .WithMany(t => t.HotelCategories)
                .HasForeignKey(pt => pt.CategorieId);

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelFormules)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Formule)
                .WithMany(t => t.HotelFormules)
                .HasForeignKey(pt => pt.FormuleId);

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelServices)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Service)
                .WithMany(t => t.HotelServices)
                .HasForeignKey(pt => pt.ServiceId);

            modelBuilder.Entity<HotelThemeModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelThemes)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelThemeModel>()
                .HasOne(pt => pt.Theme)
                .WithMany(t => t.HotelThemes)
                .HasForeignKey(pt => pt.ThemeId);

            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasOne(pt => pt.ChambreReservee)
                .WithMany(t => t.ChambreReserveeServices)
                .HasForeignKey(pt => pt.ChambreReserveeId);

            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasOne(pt => pt.Service)
                .WithMany(p => p.ChambreReserveeServices)
                .HasForeignKey(pt => pt.ServiceId);

            modelBuilder.Entity<ParticipantReservationModel>()
                .HasOne(pt => pt.Participant)
                .WithMany(p => p.ParticipantReservations)
                .HasForeignKey(pt => pt.ParticipantId);

            modelBuilder.Entity<ParticipantReservationModel>()
                .HasOne(pt => pt.Reservation)
                .WithMany(t => t.ParticipantReservations)
                .HasForeignKey(pt => pt.ReservationId);

            #endregion

            #region One-to-many relationships
            
            modelBuilder.Entity<ImageModel>()
               .HasOne(h => h.Hotel)
               .WithMany(i => i.Images)
               .HasForeignKey(h => h.HotelId);

            modelBuilder.Entity<HotelModel>()
               .HasOne(h => h.Pays)
               .WithMany(i => i.Hotels)
               .HasForeignKey(h => h.PaysId);

            modelBuilder.Entity<TarifModel>()
               .HasOne(h => h.Categorie)
               .WithMany(i => i.Tarifs)
               .HasForeignKey(h => h.CategorieId);

            modelBuilder.Entity<TarifModel>()
               .HasOne(h => h.Saison)
               .WithMany(i => i.Tarifs)
               .HasForeignKey(h => h.SaisonId);

            modelBuilder.Entity<ChambreModel>()
               .HasOne(h => h.Hotel)
               .WithMany(i => i.Chambres)
               .HasForeignKey(h => h.HotelId);

            modelBuilder.Entity<ChambreModel>()
               .HasOne(h => h.Categorie)
               .WithMany(i => i.Chambres)
               .HasForeignKey(h => h.CategorieId);

            modelBuilder.Entity<ApplicationUser>()
               .HasOne(h => h.Pays)
               .WithMany(i => i.ApplicationUsers)
               .HasForeignKey(h => h.PaysId);

            modelBuilder.Entity<ReservationModel>()
               .HasOne(h => h.ApplicationUser)
               .WithMany(i => i.Reservations)
               .HasForeignKey(h => h.ApplicationUserId);

            modelBuilder.Entity<ReservationModel>()
               .HasOne(h => h.Etat)
               .WithMany(i => i.Reservations)
               .HasForeignKey(h => h.EtatId);

            modelBuilder.Entity<ChambreReserveeModel>()
               .HasOne(h => h.Chambre)
               .WithMany(i => i.ChambreReservees)
               .HasForeignKey(h => h.ChambreId);

            modelBuilder.Entity<ChambreReserveeModel>()
               .HasOne(h => h.Reservation)
               .WithMany(i => i.ChambreReservees)
               .HasForeignKey(h => h.ReservationId);
            #endregion

            #region One-to-one relationships

            modelBuilder.Entity<ReservationModel>()
                .HasOne(a => a.Facture)
                .WithOne(b => b.Reservation)
                .HasForeignKey<FactureModel>(b => b.ReservationId);

            #endregion
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<CategorieModel> Categories { get; set; }
        public DbSet<ChambreModel> Chambres { get; set; }
        public DbSet<ChambreReserveeModel> ChambreReservees { get; set; }
        public DbSet<ChambreReserveeServiceModel> ChambreReserveeServices { get; set; }
        public DbSet<EtatModel> Etats { get; set; }
        public DbSet<FactureModel> Factures { get; set; }
        public DbSet<FormuleModel> Formules { get; set; }
        public DbSet<HotelModel> Hotels { get; set; }
        public DbSet<HotelCategorieModel> HotelCategories { get; set; }
        public DbSet<HotelFormuleModel> HotelFormules { get; set; }
        public DbSet<HotelPromotionModel> HotelPromotions { get; set; }
        public DbSet<HotelServiceModel> HotelServices { get; set; }
        public DbSet<HotelThemeModel> HotelThemes { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<ParticipantModel> Participants { get; set; }
        public DbSet<ParticipantReservationModel> ParticipantReservations { get; set; }
        public DbSet<PaysModel> Pays { get; set; }
        public DbSet<PromotionModel> Promotions { get; set; }
        public DbSet<ReservationModel> Reservations { get; set; }
        public DbSet<SaisonModel> Saisons { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
        public DbSet<TarifModel> Tarifs { get; set; }
        public DbSet<ThemeModel> Themes { get; set; }
    }
}