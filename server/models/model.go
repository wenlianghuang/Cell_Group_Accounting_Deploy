package models

type Item_Date_BuySell struct {
	Item         string `json:"item,omitempty"`
	BuyorSell    string `json:"buyorsell,omitempty"`
	SelectedDate string `json:"selecteddate,omitempty"`
	Price        int    `json:"price,omitempty"`
}

type Account_Password struct {
	Account   string `json:"account,omitempty"`
	Password  string `json:"password,omitempty"`
	Email     string `json:"email,omitempty"`
	InitMoney int    `json:"initmoney,omitempty"`
}
