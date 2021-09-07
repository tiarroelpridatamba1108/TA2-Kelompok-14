package controllers

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/mailgun/mailgun-go"
)

func PostPayment(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Order post payment",
		"Order "+data["orderId"]+" payment is being checked",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}

func PostOrder(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Your new order",
		"Order "+data["orderId"]+" is waiting for payment",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}

func PostCancelOrder(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Order cancelled",
		"Order "+data["orderId"]+" has been cancelled",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}

func PostAcceptOrder(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Order Payment Accepted",
		"Order "+data["orderId"]+" has been accepted",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}

func PostRejectOrder(c *fiber.Ctx) error {
	var apiKey = os.Getenv("EMAIL_APIKEY")
	var domain = os.Getenv("EMAIL_DOMAIN")

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	mg := mailgun.NewMailgun(domain, apiKey)
	m := mg.NewMessage(
		"Apotek Glen <apotek@glen.com>",
		"Order Payment Rejected",
		"Order "+data["orderId"]+" has been rejected",
		"install.delapanbelas@gmail.com",
	)

	mes, _, err := mg.Send(m)
	fmt.Println(mes, err)
	return c.JSON(mes)
}
