package controllers

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/mailgun/mailgun-go"
)

func PostRegister(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Welcome"+data["name"],
		"Hello! and Welcome to Apotek Glen Application!",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}
