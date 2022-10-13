let cidadeProduto;
let estadoProduto;
let valoresFrete = new Object();
const regiaoSul = ['PR','SC','RS'];
const regiaoSudeste = ['SP','RJ','MG','ES'];
const regiaoCentroOeste = ['DF','GO','MT','MS'];
const regiaoNordeste = ['BA','SE','AL','PE','PB','RN','CE','PI','MA'];
const regiaoNorte = ['TO','AM','PA','RR','RR','AP','AC'];

let nomeProduto = "Camiseta da Awari";

function calculaFrete(cidade,estado){
    estado = estado.toUpperCase();
    let valorFrete;
    valoresFrete['SP'] = 5.00;
    valoresFrete['RJ'] = 6.50;
    valoresFrete['MG'] = 7.20;
    valoresFrete['PR'] = 8.00;
    valoresFrete['AM'] = 23.50;
    valoresFrete['AC'] = 23.50;
    valoresFrete['RO'] = 22.00;
    valoresFrete['RR'] = 22.00;
    valoresFrete['sul'] = 10.00
    valoresFrete['sudeste'] = 8.00
    valoresFrete['centroOeste'] = 11.50
    valoresFrete['nordeste'] = 15.00
    valoresFrete['norte'] = 20.00

    if(cidade == "São Paulo" && estado == "SP"){
        valorFrete = 0;
    }
    else{
        switch (estado) {
            case "SP": valorFrete = valoresFrete['SP']; break;
            case "RJ": valorFrete = valoresFrete['RJ']; break;
            case "MG": valorFrete = valoresFrete['MG']; break;
            case "PR": valorFrete = valoresFrete['PR']; break;
            case "AM": valorFrete = valoresFrete['AM']; break;
            case "AC": valorFrete = valoresFrete['AC']; break;
            case "RO": valorFrete = valoresFrete['RO']; break;
            case "RR": valorFrete = valoresFrete['RR']; break;
            default:
                if(regiaoSul.includes(estado)){
                    valorFrete = valoresFrete['sul'];
                }
                else if(regiaoSudeste.includes(estado)){
                    valorFrete = valoresFrete['sudeste'];
                }
                else if(regiaoCentroOeste.includes(estado)){
                    valorFrete = valoresFrete['centroOeste'];
                }
                else if(regiaoNordeste.includes(estado)){
                    valorFrete = valoresFrete['nordeste'];
                }
                else{
                    valorFrete = valoresFrete['norte'];
                }
                break;
            }
        }
        console.log("Olá, boas vindas à nossa Loja. Já recebemos as informações e iremos mandar o produto " + nomeProduto + " para ");
        console.log(cidade + " - " + estado + " O frete para esse endereço é: R$" + valorFrete);
}

calculaFrete("Nova Iguacu","RJ");
calculaFrete("São Paulo","SP");
calculaFrete("São Paulo","PE");
calculaFrete("Recife","PE");
calculaFrete("Rio Branco","AC");
calculaFrete("Curitiba","pr");