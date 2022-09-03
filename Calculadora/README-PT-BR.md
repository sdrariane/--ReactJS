<p> Olá! Nada melhor para aprender como funcionam as funões de uma linguagem do que fazer uma calculadora, né não? Então, vamos lá! </p>
<hr/>
<h3><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width='35px'/> ReactJS App </h3>
<p> Digite isso aqui e espere cada processo rodar para criar sua aplicação, mas se é sua primeira vez entra [aqui](http://https://reactjs.org/docs/getting-started.html "aqui") pra ler bonitinho do que precisa. </p>

```
npx create-react-app calculadora
cd calculadora
yarn start
```
<hr/>
<h1>🧮 Calculadora </h1>
<p> Primeiramente, temos que ter claro em nossa mente que uma das sacadas do ReactJS é que cada coisinha, literalmente cada uma delas, é um componente. O Header é um componente, o Footer outro e o Card de uma Section, outro também! Uns são fixos, e outros não, mas alguns certamente passam no arquivo principal App sendo renderizados no index.
</p>
<p> Parece uma salada mas te garanto que é beeem mais organizado que o HTML puro! Por hora, vamos só focar em fazer uma aplicação de página única, então, na pasta chamada 'components' dentro de 'src' vamos criar o arquivo 'Calculadora.js' e 'Calculadora.css'. </p>

![Screenshot_4](https://user-images.githubusercontent.com/65814808/188290291-ea8139bb-3035-4a99-8124-21d33eca5064.png)

<h2>📄 Calculadora.js </h2>
<p> Por mais doid que pareça vamos rodar todo o HTML e os triggers do JavaScript juntos - essa é outra magia do React. O arrquivo se inicia assim quando você roda o comando: ``` rfce ```.</p>

```javascript
import './Calculator.css';

function Calculator() {
	return (
	  <div>
	  </div>
 	);
}

export default Calculator;
```
<p> Sim, esse componente é exportado como uma função. A parte do HTML E CSS não é tão inteessante - só olhar os arquivos também né? - mas sim os trigger referentes às operações que são geridas pelo `onClick={}` o qual possui como parâmetro o `handleClick`. Tendo como princípio que há dois estados (o **estado** e o **setamento** deste estado):</p>

```
const [result, setResult] = useState("");
```
<p> Sendo ambos definidos pela conversão do texto inputado na calculadora em operação matemática</p>

``` javascript
//concatenamento do texto inputado
const handleClick = (e) => { setResult(result.concat(e.target.name)); };

// convesão do texto em operação matemática a ser calculada
 const calculate = () => {
  try {
   setResult(eval(result).toString());
  } catch(err) {
   setResult("Error");
  }
 }
```
