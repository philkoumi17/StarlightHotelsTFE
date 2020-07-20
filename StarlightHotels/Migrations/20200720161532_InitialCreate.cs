using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace StarlightHotels.API.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(150)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categorie",
                columns: table => new
                {
                    CAT_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CAT_Type = table.Column<string>(maxLength: 50, nullable: true),
                    CAT_Descriptif = table.Column<string>(maxLength: 255, nullable: true),
                    CAT_Image = table.Column<string>(maxLength: 255, nullable: true),
                    CAT_Superficie = table.Column<double>(nullable: false),
                    CAT_MaxPers = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorie", x => x.CAT_Id);
                });

            migrationBuilder.CreateTable(
                name: "Etat",
                columns: table => new
                {
                    ETAT_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ETAT_Libelle = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Etat", x => x.ETAT_Id);
                });

            migrationBuilder.CreateTable(
                name: "Formule",
                columns: table => new
                {
                    FOR_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FOR_Libelle = table.Column<string>(nullable: true),
                    FOR_Montant = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Formule", x => x.FOR_Id);
                });

            migrationBuilder.CreateTable(
                name: "Participant",
                columns: table => new
                {
                    PART_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PART_Nom = table.Column<string>(maxLength: 60, nullable: false),
                    PART_Prenom = table.Column<string>(maxLength: 60, nullable: false),
                    PART_DateNaissance = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participant", x => x.PART_Id);
                });

            migrationBuilder.CreateTable(
                name: "Pays",
                columns: table => new
                {
                    PAYS_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PAYS_Nom = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pays", x => x.PAYS_Id);
                });

            migrationBuilder.CreateTable(
                name: "Saison",
                columns: table => new
                {
                    SA_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SA_Libellé = table.Column<string>(nullable: true),
                    SA_DateDebut = table.Column<DateTime>(nullable: false),
                    SA_DateFin = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Saison", x => x.SA_Id);
                });

            migrationBuilder.CreateTable(
                name: "Service",
                columns: table => new
                {
                    SERV_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SERV_Description = table.Column<string>(maxLength: 255, nullable: true),
                    SERV_Payant = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Service", x => x.SERV_Id);
                });

            migrationBuilder.CreateTable(
                name: "Theme",
                columns: table => new
                {
                    THEME_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    THEME_Libelle = table.Column<string>(maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Theme", x => x.THEME_Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Client",
                columns: table => new
                {
                    CL_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CL_Nom = table.Column<string>(maxLength: 60, nullable: false),
                    CL_Prenom = table.Column<string>(maxLength: 60, nullable: false),
                    CL_DateNaissance = table.Column<DateTime>(nullable: false),
                    CL_Sexe = table.Column<string>(maxLength: 1, nullable: false),
                    CL_Email = table.Column<string>(maxLength: 60, nullable: false),
                    CL_Rue = table.Column<string>(maxLength: 100, nullable: false),
                    CL_Numero = table.Column<string>(maxLength: 100, nullable: false),
                    CL_CodePostal = table.Column<string>(maxLength: 20, nullable: false),
                    CL_Ville = table.Column<string>(maxLength: 60, nullable: false),
                    CL_PAYS_Id = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Client", x => x.CL_Id);
                    table.ForeignKey(
                        name: "FK_Client_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Client_Pays_CL_PAYS_Id",
                        column: x => x.CL_PAYS_Id,
                        principalTable: "Pays",
                        principalColumn: "PAYS_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Hotel",
                columns: table => new
                {
                    HOTEL_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HOTEL_Nom = table.Column<string>(maxLength: 50, nullable: false),
                    HOTEL_NombreEtoiles = table.Column<int>(nullable: false),
                    HOTEL_NombreChambres = table.Column<int>(nullable: false),
                    HOTEL_Description = table.Column<string>(maxLength: 255, nullable: false),
                    HOTEL_Adresse = table.Column<string>(maxLength: 255, nullable: false),
                    HOTEL_CodePostal = table.Column<string>(maxLength: 20, nullable: false),
                    HOTEL_Ville = table.Column<string>(maxLength: 60, nullable: false),
                    HOTEL_PAYS_Id = table.Column<int>(nullable: false),
                    HOTEL_Telephone = table.Column<string>(maxLength: 100, nullable: false),
                    HOTEL_EnPromotion = table.Column<bool>(nullable: false),
                    HOTEL_TopDestination = table.Column<bool>(nullable: false),
                    HOTEL_Actif = table.Column<bool>(nullable: false),
                    HOTEL_Coefficient = table.Column<float>(nullable: false),
                    HOTEL_CheckIn = table.Column<string>(maxLength: 50, nullable: false),
                    HOTEL_CheckOut = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hotel", x => x.HOTEL_Id);
                    table.ForeignKey(
                        name: "FK_Hotel_Pays_HOTEL_PAYS_Id",
                        column: x => x.HOTEL_PAYS_Id,
                        principalTable: "Pays",
                        principalColumn: "PAYS_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tarif",
                columns: table => new
                {
                    TAR_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TAR_Prix = table.Column<decimal>(nullable: false),
                    TAR_CAT_Id = table.Column<int>(nullable: false),
                    CategorieId = table.Column<int>(nullable: true),
                    TAR_SA_Id = table.Column<int>(nullable: false),
                    SaisonId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarif", x => x.TAR_Id);
                    table.ForeignKey(
                        name: "FK_Tarif_Categorie_CategorieId",
                        column: x => x.CategorieId,
                        principalTable: "Categorie",
                        principalColumn: "CAT_Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tarif_Saison_SaisonId",
                        column: x => x.SaisonId,
                        principalTable: "Saison",
                        principalColumn: "SA_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reservation",
                columns: table => new
                {
                    RES_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RES_CLI_Id = table.Column<int>(nullable: false),
                    RES_PART_Id = table.Column<int>(nullable: false),
                    RES_DateReservation = table.Column<DateTime>(nullable: false),
                    RES_Montant = table.Column<decimal>(nullable: false),
                    RES_ETAT_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reservation", x => x.RES_Id);
                    table.ForeignKey(
                        name: "FK_Reservation_Client_RES_CLI_Id",
                        column: x => x.RES_CLI_Id,
                        principalTable: "Client",
                        principalColumn: "CL_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservation_Etat_RES_ETAT_Id",
                        column: x => x.RES_ETAT_Id,
                        principalTable: "Etat",
                        principalColumn: "ETAT_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reservation_Participant_RES_PART_Id",
                        column: x => x.RES_PART_Id,
                        principalTable: "Participant",
                        principalColumn: "PART_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chambre",
                columns: table => new
                {
                    CH_Num = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CH_Image = table.Column<string>(nullable: true),
                    CH_Disponibilite = table.Column<bool>(nullable: true),
                    CH_HOTEL_Id = table.Column<int>(nullable: false),
                    CH_CAT_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chambre", x => x.CH_Num);
                    table.ForeignKey(
                        name: "FK_Chambre_Categorie_CH_CAT_Id",
                        column: x => x.CH_CAT_Id,
                        principalTable: "Categorie",
                        principalColumn: "CAT_Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chambre_Hotel_CH_HOTEL_Id",
                        column: x => x.CH_HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HotelCategorie",
                columns: table => new
                {
                    HOTEL_Id = table.Column<int>(nullable: false),
                    CAT_Id = table.Column<int>(nullable: false),
                    HOTCAT_Image = table.Column<string>(maxLength: 255, nullable: true),
                    HOTCAT_Descriptif = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelCategorie", x => new { x.HOTEL_Id, x.CAT_Id });
                    table.ForeignKey(
                        name: "FK_HotelCategorie_Categorie_CAT_Id",
                        column: x => x.CAT_Id,
                        principalTable: "Categorie",
                        principalColumn: "CAT_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelCategorie_Hotel_HOTEL_Id",
                        column: x => x.HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HotelFormule",
                columns: table => new
                {
                    HOTEL_Id = table.Column<int>(nullable: false),
                    FOR_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelFormule", x => new { x.HOTEL_Id, x.FOR_Id });
                    table.ForeignKey(
                        name: "FK_HotelFormule_Formule_FOR_Id",
                        column: x => x.FOR_Id,
                        principalTable: "Formule",
                        principalColumn: "FOR_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelFormule_Hotel_HOTEL_Id",
                        column: x => x.HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HotelService",
                columns: table => new
                {
                    HOTEL_Id = table.Column<int>(nullable: false),
                    SERV_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelService", x => new { x.HOTEL_Id, x.SERV_Id });
                    table.ForeignKey(
                        name: "FK_HotelService_Hotel_HOTEL_Id",
                        column: x => x.HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelService_Service_SERV_Id",
                        column: x => x.SERV_Id,
                        principalTable: "Service",
                        principalColumn: "SERV_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "HotelTheme",
                columns: table => new
                {
                    HOTEL_Id = table.Column<int>(nullable: false),
                    THEME_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HotelTheme", x => new { x.HOTEL_Id, x.THEME_Id });
                    table.ForeignKey(
                        name: "FK_HotelTheme_Hotel_HOTEL_Id",
                        column: x => x.HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_HotelTheme_Theme_THEME_Id",
                        column: x => x.THEME_Id,
                        principalTable: "Theme",
                        principalColumn: "THEME_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    IM_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IM_Image = table.Column<string>(maxLength: 255, nullable: true),
                    IM_HOTEL_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.IM_Id);
                    table.ForeignKey(
                        name: "FK_Image_Hotel_IM_HOTEL_Id",
                        column: x => x.IM_HOTEL_Id,
                        principalTable: "Hotel",
                        principalColumn: "HOTEL_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Facture",
                columns: table => new
                {
                    FAC_Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FAC_Date = table.Column<DateTime>(nullable: false),
                    FAC_MontantTotal = table.Column<decimal>(nullable: false),
                    FAC_RES_Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Facture", x => x.FAC_Id);
                    table.ForeignKey(
                        name: "FK_Facture_Reservation_FAC_RES_Id",
                        column: x => x.FAC_RES_Id,
                        principalTable: "Reservation",
                        principalColumn: "RES_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReservationChambre",
                columns: table => new
                {
                    CH_Num = table.Column<int>(nullable: false),
                    RES_Id = table.Column<int>(nullable: false),
                    RESCH_NbAdultes = table.Column<int>(nullable: false),
                    RESCH_NbEnfants = table.Column<int>(nullable: false),
                    RESCH_DateArrivee = table.Column<DateTime>(nullable: false),
                    RESCH_DateDepart = table.Column<DateTime>(nullable: false),
                    RESCH_LitSup = table.Column<bool>(nullable: false),
                    RESCH_MontantTotal = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationChambre", x => new { x.CH_Num, x.RES_Id });
                    table.ForeignKey(
                        name: "FK_ReservationChambre_Chambre_CH_Num",
                        column: x => x.CH_Num,
                        principalTable: "Chambre",
                        principalColumn: "CH_Num",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationChambre_Reservation_RES_Id",
                        column: x => x.RES_Id,
                        principalTable: "Reservation",
                        principalColumn: "RES_Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Chambre_CH_CAT_Id",
                table: "Chambre",
                column: "CH_CAT_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Chambre_CH_HOTEL_Id",
                table: "Chambre",
                column: "CH_HOTEL_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Client_ApplicationUserId",
                table: "Client",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Client_CL_PAYS_Id",
                table: "Client",
                column: "CL_PAYS_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Facture_FAC_RES_Id",
                table: "Facture",
                column: "FAC_RES_Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Hotel_HOTEL_PAYS_Id",
                table: "Hotel",
                column: "HOTEL_PAYS_Id");

            migrationBuilder.CreateIndex(
                name: "IX_HotelCategorie_CAT_Id",
                table: "HotelCategorie",
                column: "CAT_Id");

            migrationBuilder.CreateIndex(
                name: "IX_HotelFormule_FOR_Id",
                table: "HotelFormule",
                column: "FOR_Id");

            migrationBuilder.CreateIndex(
                name: "IX_HotelService_SERV_Id",
                table: "HotelService",
                column: "SERV_Id");

            migrationBuilder.CreateIndex(
                name: "IX_HotelTheme_THEME_Id",
                table: "HotelTheme",
                column: "THEME_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Image_IM_HOTEL_Id",
                table: "Image",
                column: "IM_HOTEL_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_RES_CLI_Id",
                table: "Reservation",
                column: "RES_CLI_Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_RES_ETAT_Id",
                table: "Reservation",
                column: "RES_ETAT_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_RES_PART_Id",
                table: "Reservation",
                column: "RES_PART_Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReservationChambre_RES_Id",
                table: "ReservationChambre",
                column: "RES_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Tarif_CategorieId",
                table: "Tarif",
                column: "CategorieId");

            migrationBuilder.CreateIndex(
                name: "IX_Tarif_SaisonId",
                table: "Tarif",
                column: "SaisonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Facture");

            migrationBuilder.DropTable(
                name: "HotelCategorie");

            migrationBuilder.DropTable(
                name: "HotelFormule");

            migrationBuilder.DropTable(
                name: "HotelService");

            migrationBuilder.DropTable(
                name: "HotelTheme");

            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "ReservationChambre");

            migrationBuilder.DropTable(
                name: "Tarif");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Formule");

            migrationBuilder.DropTable(
                name: "Service");

            migrationBuilder.DropTable(
                name: "Theme");

            migrationBuilder.DropTable(
                name: "Chambre");

            migrationBuilder.DropTable(
                name: "Reservation");

            migrationBuilder.DropTable(
                name: "Saison");

            migrationBuilder.DropTable(
                name: "Categorie");

            migrationBuilder.DropTable(
                name: "Hotel");

            migrationBuilder.DropTable(
                name: "Client");

            migrationBuilder.DropTable(
                name: "Etat");

            migrationBuilder.DropTable(
                name: "Participant");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Pays");
        }
    }
}
