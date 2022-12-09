var Paperclips       =     0;
var Funds            =     0;
var Inventory        =     0;
var Price            =    25;
var Marketing        =     1;
var Wire             =  1000;
var WireCost         =  1000;
var AutoClipers      =     0;
var AutoClipersPrice =   500;
UpdateMarketingTime();
UpdateUserView();
function UpdateUserView(){
    document.getElementById('PaperclipsTxt').innerHTML = 'Paperclips: ' + Paperclips;
    document.getElementById('FundsTxt').innerHTML = 'Available Funds: $ ' + CentsToDollars(Funds);
    document.getElementById('InventoryTxt').innerHTML = 'Unsold Inventory: ' + Inventory;
    document.getElementById('PriceTxt').innerHTML = 'Price: ' + CentsToDollars(Price);
    document.getElementById('MarketingLvlTxt').innerHTML = 'Level: ' + Marketing;
    document.getElementById('MarketingCostTxt').innerHTML = 'Cost: $ ' + GetMarketingUpgradeCost();
    document.getElementById('WireTxt').innerHTML = 'Wire: ' + Wire + ' inches';
    document.getElementById('WireCostTxt').innerHTML = 'Cost: $  ' + CentsToDollars(WireCost);
    document.getElementById('AutoCliperNumTxt').innerHTML = AutoClipers;
    document.getElementById('AutoCliperCostTxt').innerHTML = 'Cost: $ ' + CentsToDollars(AutoClipersPrice);

    if (Wire > 0) {document.getElementById('MakePaperclipButton').classList.remove('PassiveButton');}
    else {document.getElementById('MakePaperclipButton').classList.add('PassiveButton');}

    if (Price > 1) {document.getElementById('LowerButton').classList.remove('PassiveButton');}
    else {document.getElementById('LowerButton').classList.add('PassiveButton');}

    if (Funds >= Math.pow(2, Marketing - 1) * 10000) {document.getElementById('MarketingButton').classList.remove('PassiveButton');}
    else {document.getElementById('MarketingButton').classList.add('PassiveButton');}

    if (Funds >= WireCost) {document.getElementById('WireButton').classList.remove('PassiveButton');}
    else {document.getElementById('WireButton').classList.add('PassiveButton');}

    if (Funds >= AutoClipersPrice) {document.getElementById('AutoCliperButton').classList.remove('PassiveButton');}
    else {document.getElementById('AutoCliperButton').classList.add('PassiveButton');}

}
function GetMarketingUpgradeCost(){
    return Math.pow(2, Marketing - 1) + '00.00';

}
function CentsToDollars(Cents){
    if (Cents % 100 > 9){
        return Math.floor(Cents / 100) + '.' + Cents % 100;
    }
    else{
        return Math.floor(Cents / 100) + '.0' + Cents % 100;
    }
}
function HandleMakePaperclipPress(){
    if (Wire > 0){
        Wire -= 1;
        Inventory += 1;
        Paperclips += 1;
    }
    UpdateUserView();
}
function HandleLowerPricePress(){
    if (Price > 1){
        Price -= 1;
    }
    UpdateUserView();
    UpdateMarketingTime();
}
function HandleRaisePricePress(){
    Price += 1;
    UpdateUserView();
    UpdateMarketingTime();
}
function HandleMarketingPress(){
    if (Funds >= Math.pow(2, Marketing - 1) * 10000){
        Funds -= Math.pow(2, Marketing - 1) * 10000;
        Marketing += 1;
    }
    UpdateUserView();
    UpdateMarketingTime();
}
function HandleWirePress(){
    if (Funds >= WireCost){
        Funds -= WireCost;
        Wire += 1000;
        WireCost += 100;
    }
    UpdateUserView();
}
function SellClip(){
    console.log("Selling Clip")
    if (Inventory > 0){
        Inventory -= 1;
        Funds += Price;
    }
    UpdateUserView();
}
function UpdateMarketingTime(){
    clearInterval(SellClip);
    setInterval(SellClip, (Price ** 2 * 100) / Math.pow(2, Marketing));
}
function UpdateAutoCliperTime(){
    clearInterval(HandleMakePaperclipPress);
    setInterval(HandleMakePaperclipPress, 1000 / AutoClipers)
}
function HandleAutoCliperPress(){
    if (Funds >= AutoClipersPrice){
        Funds -= AutoClipersPrice;
        AutoClipersPrice = Math.floor(AutoClipersPrice * 1.1);
        AutoClipers += 1;
    }
    UpdateUserView();
    UpdateAutoCliperTime();
}
function SaveGame(){
    document.cookie =   "Paperclips="        + Paperclips
                      + ";Funds="            + Funds
                      + ";Inventory="        + Inventory
                      + ";Price="            + Price
                      + ";Marketing="        + Marketing
                      + ";Wire="             + Wire
                      + ";WireCost="         + WireCost
                      + ";AutoClipers="      + AutoClipers
                      + ";AutoClipersPrice=" + AutoClipersPrice
}
