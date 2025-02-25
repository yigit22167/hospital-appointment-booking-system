using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class removeAvailabilityTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Availabilities_AvailabilityId",
                table: "Appointments");

            migrationBuilder.DropTable(
                name: "Availabilities");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_AvailabilityId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "AvailabilityId",
                table: "Appointments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvailabilityId",
                table: "Appointments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Availabilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DoctorId = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    StartTime = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Availabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Availabilities_Doctors_DoctorId",
                        column: x => x.DoctorId,
                        principalTable: "Doctors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_AvailabilityId",
                table: "Appointments",
                column: "AvailabilityId");

            migrationBuilder.CreateIndex(
                name: "IX_Availabilities_DoctorId",
                table: "Availabilities",
                column: "DoctorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Availabilities_AvailabilityId",
                table: "Appointments",
                column: "AvailabilityId",
                principalTable: "Availabilities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
