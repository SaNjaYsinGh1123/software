import React, {useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JsPDF from "jspdf";
import "jspdf-autotable"; // Optional: For table support
import { Spinner } from "reactstrap";

const Invoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const invoiceId = location.state;

    

    const addInvoiceContent = (doc,forWhat,data,OrderResult,calc,addr,addr1) => {
    // Title 210 = 180 + 30 = 
    // doc.setLineHeightFactor(0.8);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Tax Invoice', 100, 20, { align: 'center' });



    const imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABBCAYAAAAaEWC3AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAO3RFWHRDb21tZW50AHhyOmQ6REFGXzdMSi13LVk6MyxqOjMwMjY4NDEwNzYyMDk1MDgzNTcsdDoyNDAzMTkwNJTXzdgAAATkaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KICAgICAgICA8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+VW50aXRsZWQgZGVzaWduIC0gMTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgICAgICAgPEF0dHJpYjpBZHM+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjQtMDMtMTk8L0F0dHJpYjpDcmVhdGVkPgogICAgICAgIDxBdHRyaWI6RXh0SWQ+ZDQ3OTE1NTMtNzZjZi00NGFlLWI3OTYtODY5ZTAzM2ZiNTMwPC9BdHRyaWI6RXh0SWQ+CiAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICAgICA8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgPC9BdHRyaWI6QWRzPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgICAgICAgPHBkZjpBdXRob3I+c2FuamF5PC9wZGY6QXV0aG9yPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5DYW52YTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICAgIAogICAgICAgIDwvcmRmOlJERj4KICAgICAgICA8L3g6eG1wbWV0YT5e6PNbAAAm4ElEQVR4nO2deXhV5bnof2vtMTvZO9NOyJyQkIEAITIHAqhUUbQ91FrPofa0x1a9lmN9sD1Wq3Jba61Y6y14tQLaipxUDlAVFZAik4BhiGEmJAQCSQiZ5z1kD2t994+99yJhMlgZnvv05SHZz17f+L7fO7/fiiSEEPwT/r8F+Xov4J9wdUF/vRcwWBBCIIRAkiQkSbrqc/X/DVyTea8G3PAEDiHZ4/HgcDiIiIjAaDRqyP46kR6aS1VVurq66Ovrw2AwYDAYsNlsyLL8tc95teGGJXAI2YqiALBp0yZWrVpFQUEBWVlZGI1Gxo0bR3x8PPCPI10IgaqqeL1euru7WbBgAceOHcNqtWK325k6dSq33XYbdrv9a5nvWoF0IxpZIXFcV1dHSUkJzc3NHDp0iN27d2MymTCZTFitVmbOnMnTTz9NYmIiOp3uKyNdVVV6enp4++232bt3Ly6Xi9LSUtxuN0IIZFkmPT2d2bNn8+Mf/5iUlBQMBsPXvOurAzccgUPErampYd68eQD09vbS1tbGnDlzUFWV9evXY7VaaWhoICMjgx/84AfMmjULq9V6RUQOzeVyuXjxxRfZvn073/rWt1i7di3Dhg1j9uzZNDQ08Pvf/x673U57ezt2u52f/OQnzJkzZ4CquFHhhrKiQ2etqamJRYsW4XA4WLRoEXfeeSeFhYX813/9F48//jijRo1i06ZNmM1mkpOTeeGFF9i1a5dGsCsBj8fD+++/z+rVq3n44Yd58MEHGTduHNOnT2fKlCncfvvtJCYmsm/fPvLy8pg1axaLFy/mxIkTX2m+aw26X//617++3ovoD42NjcyfPx+3242qqtx7771kZmby4YcfsnnzZlpbW5k0aRL19fXU1NQwadIkzGYzu3btIj8/H7vdrhlDlwMhBB6Ph5KSEvbv309eXh61tbVMmzaNyMhI3nrrLT766CPq6+spLCykurqa5uZmsrOzOXz4MC0tLSQnJxMXF4dOp7sGmPlqcMMQOMQNq1evpqamhtdff50jR45w4MABZs2aRVZWFtXV1ezdu5fNmzfT3NxMW1sbNTU1NDc3ExERwc6dO0lPTyclJQW4vCGkqiodHR0sXLiQm2++mdmzZ7NixQrsdju33XYbkZGRhIeHU1FRwaeffkpTUxM6nY76+nr0ej1JSUmsXr2a/Px8kpKSvnS+6wU3DIEhgKDKykoOHjzIXXfdRW5uLqtXryY9PZ3Jkydzxx13cMstt5CQkEB7ezt1dXXYbDaysrJYvHgxfr+fNWvWMGvWLAwGw5civKWlhVWrVpGWlsbMmTPJyMjgb3/7G+PHj2fs2LFMnjyZ6dOnM336dHQ6HeXl5eh0Or73ve/x9NNPs2vXLhRFYfz48Tesn3xD6OCQuNy0aRMbN27k7NmzlJaWagbU8uXLOXnyJDqdjuTkZL773e/y0ksvMXnyZHp6evjRj35EamoqaWlpNDY20t7ejqqql9SPQghOnz7Ns88+i9VqZfPmzRw6dIhJkyYxduxYXnzxRerq6gCw2+2MHTuW+++/n5iYGFJSUpg9ezZGoxFZlqmvr6ehoeGy811PuCE4WAhBU1MTv/zlL5k9ezZ33XUX69evJycnh8LCQvbs2cOGDRsYN26cFnCIjo6mq6uLuro6xo8fj8ViYcOGDZSWllJdXU1WVhZxcXEXcJYQAp/Px5///GdOnDjB22+/jdVq5dNPPyU3N5eRI0eyatUq6uvrmTx5siYJIiIi2Lp1Kx6PB6fTicFgYOXKlTQ3N1NaWsqYMWOIjY294bj4urtJQgh6e3v5wx/+wNq1a1myZAljxoyhrq6OrVu3YjKZmDZtGmvWrKGoqIixY8ciSRI+n497772Xbdu2YbPZGDJkCKqqMm/ePMrKytDr9Tz33HMDXCchBH6/n08//ZSf/exn5OTk8M4772CxWDhy5AjLli2juLiY8ePHc+bMGSZOnIjRaEQIQWtrK/fddx8VFRWkpKTgdrsZNmwYCxYs0MZ45plnBqUariVcdxEdCmhs2LCB5ORkli5dSn19Penp6YwcOZKSkhIOHz7MAw88QEFBAZIkIYRAr9czYcIEvF4vbW1tNDQ08Nhjj3HPPfcwbtw4du/eTUdHxwXzeb1e9u7dS25uLtnZ2SxduhSPx8OoUaOYMWMGH3zwAS6XiylTpgzwc8PCwkhJScHlclFZWUlMTAy/+tWvsNvtdHR0cLy6WguM3Ehw3UW0EILGxkb279/PokWLcLlc6PV60tPTSUhIYOTIkeh0OtLT0zXuCCE9IyOD3t5eqqqqUBSFzMxMGhsbefPNN6mpqUGv15OXl0dERITWR1EUDh8+TH5+Pg8++CCqqhIdHU1YWBgjRowgNzeXuLi4AZwvSRJGo5GhQ4fi9/s5duwYkiShqiorVqzg73//Oz09PXi9XgoLC2+oAMh1JzCg+bEjR47k9ttvJzY2lp07dxIWFkZOTg6pqakXDUVarVYKCgrYvn079fX1HDx4kI0bN9Le3s7cuXPZs2cPfr9/gJWr0+nQ6XQcPHiQiRMnMmLECBobG1mzZg25ubmkpKQMOBD9ITExkeTkZFavXq0ZZ0eOHCEhIYH58+ezatUqRo8ePSg37VrBdRfRAJGRkdxyyy18+OGHWsbIYDDQ1NR0SZEnSRKyLJOcnMzMmTMJCwvD7Xbjdrux2WzExMSQkJDA4cOH8Xg82jiSJFFQUEBsbCzbt2/H7XaTkZHBpEmTtENwMcKEvktLS+Nb3/oWDocDVVU1w6qqqgqXy0VfX9/VQ9RXgOtuZAFaPHjFihXs37+fuXPnkp+fD1yeC0JLb2xsZOvWrRw9epQlS5bgcrm0Q/K73/2Of//3f0eW5QHG1tmzZ1mwYAEGg4Enn3zyirJSjY2NVFZWsmHDBt544w28Xi9CCCZMmMDy5cvJyMgY9FhXG26IdGEoVWez2Th16hQLFy7koYceorCwUMvaXI6rkpKSmDNnDl1dXVgsFrZt24bJZEIIwaxZszTihg6Ez+fj0KFDNDU1kZeXx29/+1t+9KMfMXLkSPR6/SXnC0FiYiJDhgwhOzsbq9VKa2srnZ2dZGdnEx8fr2WgbgS47jpYCEFXVxdLly5ly5Yt/OY3vyE+Pp6lS5cSFRVFRkbGoJL7kiRhNpuZMmUK3/nOd7jrrrs4evQoUVFRpKWlaQj3er1s2LCBxYsX8+ijj/LAAw/Q1NTEkiVLiIuLIzU1dVCJ/ZBvPHXqVO644w4KCgpYuXIlCQkJDB069Ev7Xyu4rgQO+Ze//e1vcTqdPPvss2RlZREbG0tWVhbLli3j7Nmz5OfnYzQatT799en5IMsyRqOR8PBw4uLiePXVV0lLSyM5ORmXy8XixYvZvHkzP/vZzygqKqKxsZHw8HAyMzNZuHAhqqpqBQUhrr/UnP0/R0VFER8fz6uvvkpmZuYNE5++LgQOIauuro4XXngBg8HAvHnzSE1Npa6ujkceeQRJkvj+97/P2rVrWbduHQDh4eGaOD/fGOpvIIW+j4+Px2Aw8OabbxIZGUlJSQkHDx7kmWeeYfTo0fh8PhYtWsRLL73EmDFjuPvuu/nb3/7Gxx9/TGtrqyba+/r68Pl8GtEvNW9ycjJWq5Xly5cTFRVFcnLydS/zueZGVogbTp8+zUsvvUR0dDSPP/44cXFxKIrCokWLeOutt1BVlXfeeYecnBw++ugj3n//fZxOJ8OGDSMqKorY2FjGjx/PuHHjsFqtgc2ch8RQWHLlypW8/PLLWCwWXnvtNcaMGYMQgrKyMp544glaWlrIyMhg+fLlAHz88VqWLFmMy+Vi6NChhIeHY7VaKSoqYsaMGaSnp19yPr/fz5YtW3j77bc1VREWFnbR9tcCrqmRFUL48ePH+fWvf01qaio///nPNVejsrKSdevWIUkShYWFJCYmEhUVxT333EN5eTlLlizhs88+0/zZIUOGMHnyZJ544glGjRp1QZhQkiQMBgP33XcfYWFhLF26lPfee4+oqCgSExP561//SkNDA0lJSTz55JNER0fj9Xqx2Wz09fVx/PhxKisrtfFWrVrFmDFjePrpp7nlllvQ6XQDjClJktDr9cyYMQOz2cwf/vAHSktLeeyxx0hOTkav11/zrNM1E9FCCJxOJ6tWrWLBggUUFBTw+OOPEx8fryHJ7Xbz+eefExUVxfPPP09mZibt7e3Mnz+fkpISzccMiene3l6OHatkx47tJCenkJmZdUFAJHQYcnNzycrKYu3atbz77rtERkbS0tJCc3Mzzz//PNOmTcPr9fLmm2/y1FNPUl9fj6qq2hgQsL7r6+vZtWsXqampZGZmasn+/oZgSFwPGzaMNWvW8PHHH+NyuUhKStKCKNeKyFedwCEN0NXVxVtvvUVJSQkPPvggDz30EDExMciyrBG/pKQEv9/P008/TW5uLvX19cyfP593330Xt9uNLMvIsjyAiKHE/Z49exg6NINhw4ZdUk+mp6czY8YMJEli+fLl7Nixg3/7t3/j/vvvx+v1smTJEl588UU6Ozu1dYeHhzNmzBiio6NpbW1FVVU6Ozv5/PPPiYiIoKCg4KKHSpZlUlJSKCoqQghBSUkJ27ZtIz4+npSUlH+oSPBK4KrrYL/fT2VlJS+88AIdHR08+eSTFBcXa+Iq1CaEgGeeeYb09HROn67lmWeeZt26dfh8Pr797W/z/e9/H0VRBnDLwYMHtfqt3NxcXn/9dYqLiy/JJaHcc2VlJW+++Sbbtm3jnnvuISwsjD/+8Y90dHRoxJVlmTlz5vDLX/6Snp4e5s6dy4EDB7Rndrudxx57jIcffviSqcJQKW51dTWLFy/WAjn33XffNck8XVUODlVH/vznP8fpdLJgwQImTZqk6a7Q5o4dO8aOHTt49NFHyczM5OjRo8ybN4+NGzeiKApCCMaOHUtxcTETJkzQ4r3Hjh2jqamJL774AiEEJpOJw4cPU1RUdEmE99ffxcXFGI1GXn31VdatW4fL5RpAXLvdzlNPPUVRURHx8fEcP36cAwcOaMl9t9tNaWkpsixTUFBwUWMqNF9cXBy33nor0dHRWK1Whg0bNiguPp//rvRAXDUChxbW09ODEIJHH32UESNGXJSzQmUvaWlplJWVMW/ePHbs2DHgCsmJEyf45JNPKC4uJi0tjSNHjvDII4+wbt06PB4PeXl5vPHGG+zdW8bWrVuZNm3aJZMGIf9WURTKy8vZsmULbrdbexb6n5mZyZw5czCZTNhsNjweDxs3bsTtdg/Qy2VlZTQ3NzNhwgQiIiK0cfrPB2AwGMjPzycnJ2eABPsyHIY+f5XbHFddRKuqis/nQ6/XD+Da/hByL3bu3Mn8+fOJi4vjtttuu6hFfOedd5KYmEhLSwsbN27E6XQihCAjI4Pbb7+d8vJ9PPbYTxk7dizPPvssQ4YMuWhVh8vl4i9/+QsLFy5k9uzZZGdnX4DQzMxMhg8frpUKtba2snHjRnp7ewesq7u7mw8//JDs7Gzmz59PZmbmZVVEqN/lIIST2tpajh49it/vZ+TIkWRmZg7qcGjruxZ+cP/Td7FnAOvWreO53/yG3JwcXnzxRZKTky/Zp3/S4Hzw+/1s3bqVH//4xzzwwAM89dRTmM1mzVIPidZ33nmHl19+mYcffpi5c+dqvvTl5rvUnIqisG/fPp544gliY2N54YUXyM3N/crWcki67N+/n40bN5Keno7JZKK2tpaJEycyZcqUQce6r0lE/FKbDBkg77//Pr95/nmKp0zh5ZdfJikp6SshJuSHTps2jeeee441a9awbNk7+Hw+LcDidrtZsWIFv//973nkkUf4z//8T02sXsna+4Msy4wdO5Y33ngDRVF49NFH2b17N36//ytXePT09FBWVsa0adNobW2lqamJoqIi9uzZQ0tLy6DHvS4pj5Af63a7effdd3nuuef4xowZ/OpXvxrgF1+u/+XyxCaTie9973v88If/weLFb7Bhwwb8fj9er5ePPvqIl156iUd+8hMeeughwsPDvzQleX48+nwIuW95eXm88sorJCQk8OSTT/LZZ59pqcQrgVB4FAIx7traWk6dOkVERARms5nW1tZBj3ndkg0ul4u33nqL119/nR/+8IfMmzdPK5P5OlwHvV7PiBEjaG5upqSkhNzcXCoqKnj++ef5zne+w2M//SlWq/VrTetJkkRMTAzjx4+nurqa1157jbS0NLKysrQ05GBACIHX6+XQoUMkJiZitVpJSEggLCyM06dPM2HCBGw226DwdM3zwaGgxp/+9CcWLlzIiBEjsNlsfPDBBxcs+GKx3vOfGwwGIiIiCAsL0yog+8PEiRPZunUrc+fOxev1YbVGkJSUxEcffXQJBEl8Gd5kWcZkMhEWZsFiCbvg6ooQgpkzZ1JRUcFPf/pTurq6+MEPfnBFwY2oqCgKb7qJXbt2U1Q0Cb1ez2fbt5Ofn8+QIUMGNQZcp4qOuro6fvGLX1BRUQGgRbMGLEyWkftxc0ishz7DxV0RIQQhCknBsRVFQZLlABcFk/GqqiICHc7LRMlIsqRFoyRZQpZkbUxVVRGqilAFqlCDoltFVYPrF4LA8gJxd7/fT15eHosXL8Zut1+RdFJVlQMHDvBFeTmKojBu3DhuKiy8ImkweAILAYM9C/03cTFLV1FobWujp6fnsoaIJEmBsfr5w5deXr9n/QgcGidUbKeECHT+WBJISKEPgb4hovffkxCI0Hzn6WYx8AciuAaLxUJqatoFiYnzaR0YcuBrI0BohzvkZl4VP1j4/Qifb5CjSkh6PcLnJ7TZi4KsQzLoBxwI4feD349GHllGMl542VoIAYoyoK2kkxHn+4hCBNYR5H4kkAyGwJwXUQFdXX14fQqKoiIEREWaCQ83XnR+ASh+Qa/Dg9sdsNR1OhmLxUBEuAlZDhDJ51NRVDW4zgA+TEY9sjxwfp9Pwe9XtUNtMMjodAPLja7UPhkUrwshcFUco2fLNkTwlQqXA11UJBFjbqJ3115Ut+uSNDZlpBHzL98MIDwIvbv24PhiHwgVBBiSEon55l3IEf2s3aBY7dlTRu+uPUiyBAJMmUOJuv0bSOGWQFshUNxuOtd8jLexCQA5PJyY2XdjSEgYwJlCCBwOL6+8up26M104nF6EqnL/v47h298aoSE61FYg0drqYNv2GnbtreV0XSc+n0pEhJHMoTHcXJzJzdOyMBl1fLrlODWnOs5JFglm351PSnJUaDsoisrGLdXU1HRo5y4n284t07LQ6y8eIBoMDE6YC4G74hjNS/6M0EpQ++u/gcEMU3oast5A67L/xtfeHiBIqKF8ziCxTp5A9F13BggsBKq7j7a//g/dmzYTUKUShsQELCOGE14w6oJldW3YSPtf/0dDnGloBpaR+Zizh51b97Eqmt5Yii9IYF10FGE5wzAMGXKOuIGmHDx0ltI9tXR29gX2I8OWz04yfWom9thwTVsIAVVVLfzxtZ0cONyI1+sHCWRJQgg4VtVCTU0HE8elYjSEsWnrSTZvO6H11+slJoxLJTkpRGBBc0svy0vKqapu0+bOzx1Cft4QkhJtX2r4XQoGra2NKSnYbp4KQuBv78S5/0CAm4OLNthjsdw0OhBsiIlGDg8HBBIBUYZeT+T0YqzTpwYxqmJMTNS4VwiBp66OvpM1IEAKYtLX1IxjdxlhebnIRqMmWoVfwdfUohlKAN66OlyHj2DOygRJQvX5cH6xD39rG0KoSEiIPg+eU7VIt/YT0QL8isqeL+rp7fUggv8QEpVVLdSf6SLOHq6ZEz29fSxdtpfyAw0oioosSaSkRHLr9CwcDi/lBxowm/WYzYG9BVSv0PpLFwk/HKtqpanVMWDu03WdnDrdQVKijX624xXBoAgsyTK24iKskyeCJOPYU0bNj/8XirsvQAhJwjJyBEP/7x8DBFNVenaWBvRecGGSXo9ldAH2++cwYJ2hY62quA5X4GtsDOA8tCFVpXf3HmLv/TZyTFAXCoHidOJraTk3DCAUld7PdxP9zbtBr0Pp6qa3dFfAdhCBc6V6PHjq6wdIHCEE7e1ODh5pxOcPWMgEpVJ7p5vSPXUUFiQRspGOHG3m4OFGFCWwP7PFwJzvFvKv3ylACDhZ00bV8Vb0Bl2/1YV2PVBfCSHo6/Ox72ADPT2hgoZAO4fTS+meOsaNScFs1gNXTuEr8PKDLgQEdN6lWkkSXCJ4IISqceZ5D1AcThxle1H7+gL9ZSnA6Ahc+w7grj6htUUI/G1tKN3dwZWhSRLnvv14688gyTLuyiqc+w/0my9gmHmbmlBdLu17SYLGpl7qz3QH3CNdaP0Bo6h835mATg4uvanFgdPp1Zr4fAr7Dzawt7yeru4+sjLtzLojD73uywkiSRKdXW4OH2lCqCDL56xrCdhbXkdnlxuQBu3E9Id/IIwjXdl5EgLUoIGiqghFQaiqxqq+llYce74AScZSMBK91apRzu9w0Lvz8wFD+ZqaEX2egLgGTVL429tx7C1DqCo923eiOF2I/isVAn9rO0qvQ3NxvF6FA4ca6ezqIz0tiuys2AH7PFXbyf6DZzXEGw3ygOSF1+tn09YTzPvFx/zi2fV88mkVTpdvEAQJzN9wtodTpzswmnSMvSkZo1EHSAhJcOZMN4eONHJZb+Qy8DXGoi8Tz1UFwu+nd9duGv/4Ko1/fJWzryyi470PUP1+BOA6cgTPmQZksxn79/4VU+bQwBEKim/HnjL8QY5FkvA2t6B4PEGkn/NNVXcfjrJyfC2t9JbuIajw++1YRuntQXU4tK/6+vzsLatFVVWKizK4eWpmP6tV0NvrYcfnp/D7VSQJhmXFYo+1DNijoqi43T6+2HeGF1/eyp+W7sLl9n4p1lRVsOeLerp7+kgcYuW73y7AZjUTdIHx+hR2lJ7G51O/nAQXgWuTTSLg37oOHqbtr/9D27sraV+xkq6/bwr4sarAubccFAVzTjYRE8ZhGZGHkIMqQZLw1NbhKCsPBhhUfE1NCK8Xnc2GLjLynIZTVfqqjtPx/hp8TY1IeiP66OhzAQtA6XGg9Do0q+VUbQcVVa0YjXomjE1lxPAh2Kym4GMJRVU5eqyZphYHQkB2lp17Z48KEiIUATu3X6fLy7oNlXy4tgL1MkkKkOh1eCgrPwPA6FGJDM+NJz0tWnuuqoJjVS2caej+Sjx8TWLRApD1eiLG3kTExAmBb1SBMT0VSa/H19qCc/+BAKL0enp37cXf04skywg14Hf7u7px7P0C29RiALxnGxFeL4b0NPSRNnrLykFVkYC+06dpX7EaxeHElJ5GeOFoOteuR3g9oApUhwNfaxuoKkKS2bWnjl6HF0uYgRM17UgSGIw6zdgBidr6Lk6cbCM50YZer2POd0cjhGDV+4doau4NxlGCVoOAXoeHDZ9Wcfs3ci4pqiUJqqpbqa3rQJYlvD6F8gMN5wzMYL/m5l6OHmsmPS0aIX95rLw/XBMCS7IEBgMRE8eT8OgjA54JIXDs2ou3uQVkGef+A7gOHkYINRDVEkER6/fj3HcAX2srOmsEvuYWhKpiSk4ifOIEXEcrUJ2BmirhcuFxBwyTsJxhhI8ppOuTv2tOm9rXh7e+HqEouLx+Dh1pRFVUnE4Pi9/aHTSc1H5rBKfTS1l5PRPGpmKxGDAYdMy5r5CJ41PZtPUEO0tPc/JUe7BfgDIdnW7a252XwIpAUVR27jqN0xWIEH66uZrNW0+gqIFDIoKmv8PpZffeOqZNGYrNZuJKrOlrmg++4CCLALJ7d+1GdTiQTEYM9lj0sVGB3zYrIRdDCEFfdTV9lVUovQ78HZ0ASCYTEUUT0UVFBVyfYHsJCTnMjGX0aIzJyRBMaEgExLin/gzC5+N0XSd1Z7oIC9OTlxtPXk48udlxjBgeT3i44dzKJdhZWkt7pwtJknC5vEgS5OXE8+B/jOeVF+/i9hnZA6JOqiouyb1ChY4OF4ePNOLzKoRbjETHhBEVFUZsrIWwMAP9CXnoSCPNrQ6uhLhwjdOF50e8hCThb2nFXXEMJAnb9KkBP1kKuEmO3Xtoem1xwNoGFIeT3tLdGBISUHp6kHQyuugozBnpWEaOwNdwdoC+00dGETHuJiSzGdlsQnE4AgI3qNP9rj4OH26kvcPFmJtSePYXt2I26xEC/H6VPyz6jI2bq4N6H+rPdHHg4FmSEmys+uAwljADt92STVSUmYQEK9lZcWzedlKLY0fazERGmi/AgwjiorG5l7ONvZhMembfPYLpUzOBgKv04dqjfLT+WKC9ENQ3dHPgYAPDMmODuBwcoa8+gSUC7pHix32sis6P1hHSwYYh8ShOJ57aemSzGWvxFKyTJwW4TJKQwy20/vcK/F1dmv/bW7qbiMmTUBwOJElGtoQjmYzYphXTvXEToYiGEAJT5lDMeXkItxt9TAy+tkCcVwCexia62h2UH2gAIZg6OYMh8REDuK9oQjqfbjmh6WJFhe2fn2LShDQ2bz3BqdMdbN56ghHDh+D1KXy2owavV0GSIDzcyDduGaaFOGFAYgwBVFS20N7hJM4ezq03Z3HT6CTNYGttd7Lu71WBFKkQqKpg1946Zn9zJAbD4F+deHUJHFSfAoHk89O1cTM9W7YTcmsiJozDnDkUxenElJZGxLix59J0gDExkbC8HHr37A1wNeA5c4audZ+gut1Iej36mGgknQ5LYQHG1BS89fUBTKoqERPHIYeZUVUFfXwcUvWJwNhCoHZ20lRdT0V1O/H2CCaNT9OyOyEkjxyRQEpSJPUNXSAC+vt4dRtf7DuDx+vH3edjb3l94JAQcJUkScIeG8Gdt+dw3z0F6HWh24UhrpOQJQmX00fp7tMoiiA1OZqcbHswHRg4nMMyY4mNCaO1zamdjGNVrZyoaScvJ47BFCbA1SKwJGFMTCTm3m8HIlMX1UMCY1IC/o4uIqdOwVJYgDlr6LlYsxDorBFE3z0L2WweMLbq8QQOg16POTMDAGNSIjH3/AuuA4cC7XQykdMCFrdkNBI5fRpSv1SirNfRIwTfuDWbEdmxpKZEXSD2hsRFMDwvnvozXZpob2l1UH+mi0cfLuLgkUZO13bS0ubE71dIiLeSnWVn3JgURo9K1GLRs2bmMTw3PnCAhECnl4mwmggPNzGlKCNgPFkHivI4ezh33p7HyVNt2rqMRj3tHU4kKW7QlvSVVXQEmzrKvuDkA/8L1e3WIlG26dMYuvhVLSEg/P7LEBdABAyfPg/C70MOC0Nns503nUB1uVCczoGmhZbMkpCtEejM5kBbhwMlOKckSeiio5D1+kAM2uFAdbkDIU0CZpiIsOKXdJiMOnQ6ecC8khTwQVe+d5BFf/ocl9unRctumZbF/35qBmFhBlxuH30eP0JVMZsNhIcbMRn19PeN/X4VVfSLp0kBFdDb60EVgvAw4wU559Bzr89/rhMB0W8JG/zLyK+aiJZ0OmTLwGjP+YdOAJx33aN/YluSJGSLJcDB/Y5syEXUDLZQW6sVKTx8QP+QuJcjIoIZLs5lMiQJvbhw7v5nfvTIRGJjLLgbuoOKReLosWbOnO1mxPAhmEx6Qr5vKDASqiUIrU+nk5C1eYL70EFMdOhmYj+cBOeWZQmrzYQQxuCez6mPK4Gr5iYJoLunF5/fD5JEd08PQpKDiQQZIUm0d3QETnag9CFgLdbXU1dXN4DQnd3deLxe2js68Pp8BEslqD9zhqrjx+nr6yNUiVhz6hQna2pw9/UFKi4Uhe7u7mCOVcbn99Pc2gqShMfjoa/PrRED4OzZs2zbto3Ozk4kCbIyY8kZZtfy0wCtbU4OHDqLqgokKXBz8sSJam08h8MRnLcHj8dDdXW19pqlEPEDORmJvj63ViLb09NDZWUltbW1+Hw+3C4Xx6uq6Ghv19pfacrwqhA4FMT/5JP1bNq0iaNHj7Js2bJA8CL4rKuri1de+T8D3pzucDj44IMPWLlyJUePHtWK7N577z2WLVvGtm3btBoul8vFypUrqampwesNxHz9fj9r166lpKREq0fu6elh/fr12gvG29vb+d3vfsf+/fs5fvy4dnENoKKigpUrV1JbW8uGDX+nr68Po1HHpPFp6HTn3tehqio7Sk8HxDawZs0alv/3f7N3714aGxvZsGEDR44cYe3aj7UrOe+99552/6k/nsrLyzly5Ii21r/85S+UlpZqb+TbuHEj7777LtXV1ZcJeV4a/nECX+RIhWqIzp49y5YtWzQiezwerc3Bgwfp7Oxg+/bt2g1CIQIvZfH5/VpBuhCChoYGduzYwa233orFYgnqRxWPx4PJZNI4y2KxMHz4cNLS0rAF9bmqqtr9pRA4HA7Wr19PRUUFvn51Ztu2bWPChAncdtttmEzGIGdJFI5OIibaMkDsVx5vpfpEwADq7ukBITAYDFitVtrb21m/fj1paWmEh4drb9SLiYkBBqqAvr4+/H4/iqIQHR1NTk4OmZmZGI1GFEXh5ptvZuLEiRw/flzreyWE/moEDsVoxTmfs781Fap9ttlspKWl0d3dTX5+Pi0tLdrfJCorK2PUqFHU1tZy9uxZrZ/ZbEaoqvZWHQi8sjAtLY3t27cPuIYSFhZGYmLigDJSn8+n/SmeS13+Sk5O5o477qC0tBSn81woMSsri4qKCk6ePMm+ffuCkkGQEG9lbGFyID4mSehkCU+fj893nUZRVMLCwpg+fbr2SmG73U5DQwOFhYWa6gityel00tbWNqAEuLGxUTto/W9CqKpKVVUVhw4dJjY2VpNA/Rnly+Ar3Wzwd/fQV3UcfZwdQ+IQjEPiCcsfjnVaMVKwtFNRFCwWC6NGjWJYdjZZWVnEREcTHh6Ox+PBZrMxffp00tLSsFgs2Gw2hBDY7XaGDx+OEEK74yvLMsXFxXg8Hux2O2azGZ1OR3t7Ox0dHaSmpmIymQIb0umw2+0kJiZqRDYajdqf3pFlGbPZTEFBASNHjtQIIkkSaWlptLa2cuzYMWbOnMnQoUORZRm9XofZpKfP4yc/L54RwxMYNiyOpAQbeTl2wi0WsrKyiIyMBAJF6/n5+doFOlmWsdls2O12Ojs7aW1tHVAjXVdXR3x8PDabDYPBQFJSkoaPEydOMHRoBkVFRaiqyunTp7FYLJjN5kEZXF+p8F31egPVFFpYRiAZTeijIgeI7IvdROj/ff+w5cVuDPb/LiSuL3bTbzDfXe6G4GCeKYqKz6dgMOiDBSuhdV96/Eut4fzPF9t//1LZ88e6EvjqNxsu1u0SizgfAV8XXI1xLzdmyBU65xJdG/hH9nlDvIz0n3D14MZ4Y+Y/4arB/wM66GalysO59wAAAABJRU5ErkJggg=='; // Add your base64 image string here

    // Add image to the PDF at (x, y) position with specified width and height
    doc.addImage(imgData, 'PNG', 13, 20, 30, 15); // (x, y, width, height)




    doc.setFontSize(9);
    doc.scale(1, 0.2);
    // doc.restoreGraphicsState();

    doc.setFont(undefined, 'normal');
    doc.text(forWhat, 180, 20, { align: 'center' });

    // Order details section
    doc.setFont(undefined, 'bold');
    doc.text('Order Details:', 15, 40);
    
    doc.setFont(undefined, 'bold');
    doc.text('Order ID:', 15, 44);
    doc.setFont(undefined, 'normal');
    doc.text(`${data.order_id}`, doc.getTextWidth('Order ID: ') + 18, 44);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Invoice Number:', 15, 48);
    doc.setFont(undefined, 'normal');
    doc.text(`${data.invoice_no}`, doc.getTextWidth('Invoice Number: ') + 18, 48);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Purchase Order No.:', 15, 52);
    doc.setFont(undefined, 'normal');
    doc.text(`${OrderResult.purchase_order}`, doc.getTextWidth('Purchase Order No.: ') + 18, 52);  // Increase space between label and value
    
    doc.setFont(undefined, 'bold');
    doc.text('Order Date:', 15, 56);
    doc.setFont(undefined, 'normal');
    doc.text(`${calc.orderDate}`, doc.getTextWidth('Order Date: ') + 18, 56);  // Increase space between label and value



    // Dispatch details section (Right-aligned with bold labels)
    doc.setFont(undefined, 'bold');
    doc.text('Dispatch Details :', 195, 40, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Item Count : `, 175, 44, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${data.autoInvoiceitems?.length}`, 195, 44, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Invoice Date : `, 175, 48, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${calc.invoiceDate}`, 195, 48, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Vehicle Number : `, 175, 52, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${data.vehicle_no}`, 195, 52, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Driver Name : `, 175, 56, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${data.driver_name}`, 195, 56, { align: 'right' });
    doc.setFont(undefined, 'bold');
    doc.text(`Driver Mobile :`, 175, 60, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${data.driver_mobile}`, 195, 60, { align: 'right' });

    
    // Seller details section
    doc.setFont(undefined, 'bold');
    doc.text('Seller Details:', 15, 66);
    
    // doc.setFont(undefined, 'normal');
    doc.text('Team Asia Private Limited', 15, 70);

    doc.setFont(undefined, 'bold');
    doc.text('UAM No:', 15, 74);
    doc.setFont(undefined, 'normal');
    doc.text('U17299DL2020PTC369861', doc.getTextWidth('UAM No: ') + 18, 74);
    
    doc.setFont(undefined, 'bold');
    doc.text('Address:', 15, 78);
    doc.setFont(undefined, 'normal');
    doc.text('KH 31/2 Mile Part A', doc.getTextWidth('Address: ') + 18, 78);

    doc.text('Bahadurgarh, Haryana', 15, 82);

    doc.setFont(undefined, 'bold');
    doc.text('GST No:', 15, 86);
    doc.setFont(undefined, 'normal');
    doc.text('06AACIT0794B1ZI', doc.getTextWidth('GST No: ') + 18, 86);

    
    // Buyer details section
    doc.setFont(undefined, 'bold');
    doc.text('Buyer Details:', 90, 66,{charSpace: 0.1});
    
    doc.text(`${addr.customer_name}`, 90, 70,{charSpace: 0.1});
    doc.setFont(undefined, 'normal');
    doc.text(`${addr.city_name},`, 90, 74);
    doc.text(`${addr.state_name} - ${addr?.gst?.slice(0,2)}`, 90, 78);
    doc.text(`${addr.pincode},${addr.country_name}`, 90, 82);
    
    // Delivery details section (Right-aligned with proper spacing)
    doc.setFont(undefined, 'bold');
    doc.text('Delivery Details :', 195, 66, { align: 'right' });
    
    doc.text(`${addr1.customer_name}`, 195, 70, { align: 'right' });
    doc.setFont(undefined, 'normal');
    doc.text(`${addr1.address_line_1}`, 195, 74, { align: 'right' });
    doc.text(`${addr1.city_name}`, 195, 78, { align: 'right' });
    doc.text(`${addr1.state_name} - ${addr1?.gst?.slice(0,2)}`, 195, 82, { align: 'right' });
    doc.text(`${addr1.pincode}, ${addr1.country_name}`, 195, 86, { align: 'right' });




    doc.autoTable({
        head: [['Sr. No.', 'Products', 'Grade', 'HSN', 'Unit Price', 'Qty (In meters)', 'Tax (%)', 'Tax Amount', 'Total (INR) (Excl.Tax)']],
        body: [

            ...data?.autoInvoiceitems.map((item, index) => [
                index + 1,
                {
                    // content: ` ${item?.productDetails?.hsn_name}  ${item?.productDetails?.customer_item_reference !== '' ? `CRN: ${item?.productDetails?.customer_item_reference}`:""}  Front Side ${item?.productDetails?.grain_name} | ${item?.productDetails?.emboss_name} | ${item?.productDetails?.quality_name} | ${item?.productDetails?.thickness}mm | ${item?.productDetails?.color_name} \n Back Side \n 1002 A | ACR | GRY E123 \n`,
                    content: ` ${item?.productDetails?.hsn_name}  ${item?.productDetails?.customer_item_reference !== '' ? `CRN: ${item?.productDetails?.customer_item_reference}`:""} ${item?.refProductDetails?.grain_name?'Front Side':''}  ${item?.productDetails?.grain_name} | ${item?.productDetails?.emboss_name} | ${item?.productDetails?.quality_name} | ${item?.productDetails?.thickness}mm | ${item?.productDetails?.color_name} \n ${item?.refProductDetails?.grain_name ? `Back Side  ${item?.refProductDetails?.grain_name?? ''} | ${item?.refProductDetails?.emboss_name?? ''} | ${item?.refProductDetails?.quality_name?? ''} | ${item?.refProductDetails?.thickness?? ''}mm | ${item?.refProductDetails?.color_name?? ''}`:''} \n`,
                    colSpan: 1,
                },
                `${item.grade} (${item.discount_rate}%) Disc`,
                 item.hsn_code,
                 calc.unitPrice[index],
                 item.quantity,
                 item.tax_rate,
                (calc.unitPrice[index] * Number(item.quantity) * Number(item.tax_rate))/100,
                (calc.unitPrice[index] * Number(item.quantity))
            ]),
            [
                {
                    content: `${calc.totalQty}`,
                    colSpan: 6,
                    styles: { halign: 'right',fontStyle: 'bold'} // Align text to the right
                },
                {
                    content: 'Sub Total',
                    colSpan: 2,
                    styles: { halign: 'right' ,fontStyle: 'bold'} // Align text to the right
                },
                `${calc.subTotal}`
            ],
            [
                {
                    content: 'CGST',
                    colSpan: 8,
                    styles: { halign: 'right',fontStyle: 'bold' }
                },
                `${(calc.totalTax/2).toFixed(2)}`
            ],
            [
                {
                    content: 'SGST',
                    colSpan: 8,
                    styles: { halign: 'right' ,fontStyle: 'bold'}
                },
                `${(calc.totalTax/2).toFixed(2)}`
            ],
            [
                {
                    content: 'Round Off / UP',
                    colSpan: 8,
                    styles: { halign: 'right',fillColor: [211, 211, 211],fontStyle: 'bold'}
                },
                {
                    content: `${calc.roundOff}`,
                    colSpan: 1,
                    styles: { halign: 'left',fillColor: [211, 211, 211]}
                },
                
            ],
            [
                {
                    content: 'Grand Total (INR)',
                    colSpan: 8,
                    styles: { halign: 'right',fillColor: [211, 211, 211], fontStyle: 'bold'}
                },
                {
                    content: `${calc.grandTotal}.00`,
                    colSpan: 1,
                    styles: { halign: 'left',fillColor: [211, 211, 211], fontStyle: 'bold'}
                },
            ],
            [
                {
                    content: `Amount In Words:${calc.grandTotalInWords} `,
                    colSpan: 9,
                    styles: { halign: 'center',fillColor: [211, 211, 211],fontStyle: 'bold'}
                }
            ]
        ],
        startY: 90,  // Adjust as per your layout
        styles: { 
            lineColor: [0, 0, 0], 
            lineWidth: 0.3,
            fontSize: 8,
            cellPadding: 2, // Reduced cell padding for smaller gaps
            lineHeight: 1, // Reduced line height for smaller line gaps
        },
        theme: 'plain',
        headStyles: {
            fillColor: [211, 211, 211], // Light Grey
            textColor: [0,0,0]
        },
        columnStyles: {
            0: { cellWidth: 10 },
            1: { cellWidth: 55 },
            2: { cellWidth: 15 },
            3: { cellWidth: 20 },
            4: { cellWidth: 15 },
            5: { cellWidth: 15 },
            6: { cellWidth: 15 },
            7: { cellWidth: 15 },
            8: { cellWidth: 20 }
        },
        rowStyles: {
          minCellHeight: 10 // Reduced minimum cell height for smaller row height
      },
    });
    
    // Products table with SGST, CGST, and Total

    doc.autoTable({
        head: [['* Terms & Conditions', 'For Team Asia Private Limited']],
        body: [
            [
                `
1. Goods once sold shall not be taken back or exchanged.
2. Discrepancy, if any, in the goods sold, are to be notified in writing to the seller, within the period of 7 days from the date of delivery.
3. Under no circumstances, the liability of seller can exceed the value of the present invoice.
4. In all cases, except those where the seller specifically reserves its right of disposal of goods, the property in goods passes to buyer simultaneously with the delivery of goods to carrier or bailee for transmission.
5. All disputes are subject to the jurisdiction of courts at Jhajjar, Haryana, only.`,
                `






                Authorized Signatory
                `
            ]
        ],
        startY: doc.lastAutoTable.finalY + 2,  // Adjust as per your layout
        styles: { 
            lineColor: [0, 0, 0], 
            lineWidth: 0.3,
            fontSize: 8,
            cellPadding: 2, // Reduced cell padding for smaller gaps
            lineHeight: 1, // Reduced line height for smaller line gaps
        },
        theme: 'plain',
        headStyles: {
            // fillColor: [211, 211, 211], // Light Grey
            textColor: [0,0,0],
            halign: 'left'
        },
        columnStyles: {
            0: { cellWidth: 130, valign: 'top' },
            1: { cellWidth: 50, valign: 'top', halign: 'center' },
        },
        tableLineColor: [0, 0, 0],
        // tableLineWidth: 0.2,
        rowStyles: {
          minCellHeight: 10 // Reduced minimum cell height for smaller row height
      },
    });

    };

function numberToWords(numAmount) {
        const a = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        const c = ['Hundred', 'Thousand', 'Lakh', 'Crore'];
    
        if (numAmount === 0) return 'Zero Rupees only';
    
        function inWords(numAmount1) {
            if (numAmount1 < 20) return a[numAmount1];
            if (numAmount1 < 100) return `${b[Math.floor(numAmount1 / 10)]}${numAmount1 % 10 ? ` ${a[numAmount1 % 10]}` : ''}`;
            if (numAmount1 < 1000) return `${a[Math.floor(numAmount1 / 100)]} ${c[0]}${numAmount1 % 100 ? ` and ${inWords(numAmount1 % 100)}` : ''}`;
            if (numAmount1 < 100000) return `${inWords(Math.floor(numAmount1 / 1000))} ${c[1]}${numAmount1 % 1000 ? ` ${inWords(numAmount1 % 1000)}` : ''}`;
            if (numAmount1 < 10000000) return `${inWords(Math.floor(numAmount1 / 100000))} ${c[2]}${numAmount1 % 100000 ? ` ${inWords(numAmount1 % 100000)}` : ''}`;
            return `${inWords(Math.floor(numAmount1 / 10000000))} ${c[3]}${numAmount1 % 10000000 ? ` ${inWords(numAmount1 % 10000000)}` : ''}`;
        }
    
        return `${inWords(numAmount)} Rupees only`;
    }
    
    function formatDate(inputDate) {
      const date = new Date(inputDate);
    
      // Use Intl.DateTimeFormat to format the date
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    }

    const generatePDF = (temp,OrderResult,addr,addr1) => {
        const calc = {
            totalQty:0,
            totalTax:0,
            subTotal:0,
            grandTotal:0,
            roundOff:0,
            grandTotalInWords:'',
            invoiceDate:'',
            orderDate:'',
            unitPrice:[]
        }

        temp.autoInvoiceitems.forEach((item,index)=>{
                const  tempBasicPrice = (Number(item.price) /(1 + (Number(item.tax_rate)/100)) ).toFixed(2)
                const  tempBasicPriceWithDiscount = (Number(tempBasicPrice) -((Number(tempBasicPrice) * Number(item.discount_rate))/100)).toFixed(2)
                calc.unitPrice[index] = tempBasicPriceWithDiscount;
                calc.totalQty += Number(item.quantity);
                calc.totalTax += (tempBasicPriceWithDiscount * Number(item.quantity) * Number(item.tax_rate))/100;
                calc.subTotal += (tempBasicPriceWithDiscount * Number(item.quantity));
    
        });
        calc.grandTotal = Math.round(calc.totalTax + calc.subTotal);
        calc.roundOff = (calc.grandTotal - (calc.subTotal + calc.totalTax)).toFixed(2);
 
        calc.grandTotalInWords = numberToWords(calc.grandTotal);

        calc.invoiceDate = formatDate(temp.invoice_date);
        calc.orderDate = formatDate(OrderResult.created_at);
        const doc = new JsPDF();
    
        addInvoiceContent(doc,'(Original For Buyer)',temp,OrderResult,calc,addr,addr1);
    // doc.save('invoice.pdf');

        doc.addPage();
        addInvoiceContent(doc,'(Duplicate For Transporter)',temp,OrderResult,calc,addr,addr1);

        // Add another page and duplicate the content
        doc.addPage();
        addInvoiceContent(doc,'(Triplicate For Suppliers)',temp,OrderResult,calc,addr,addr1);

        const pdfData1 = `${doc.output('bloburl')}`;
        // const pdfData2 = `${doc.output('bloburl')}#2`;
        // const pdfData3 = `${doc.output('bloburl')}#3`;

        window.open(pdfData1);
        // window.open(pdfData2);
        // window.open(pdfData3);
    };


useEffect(() => {

    const fetchOrderAddressData = async (invoiceResult,OrderResult,BillingAddressResult) => {
        console.log('location',invoiceId)
          try{
            const token = localStorage.getItem('userToken');
            // console.log('token',token);
            const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${OrderResult.delivery_address_id}`, {
              method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            // console.log('result',response);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("responsejson1 autoInvoices",result);
            
            if(result){
                //setData(result);
                  generatePDF(invoiceResult,OrderResult,BillingAddressResult,result);
                  navigate(-1);
            };
          }catch(error){
           console.log('error',error);
          }
        }
        
      const fetchOrderBillingAddressData = async (invoiceResult,OrderResult) => {
        console.log('location',invoiceId)
          try{
            const token = localStorage.getItem('userToken');
            // console.log('token',token);
            const response = await fetch(`https://factory.teamasia.in/api/public/addresses/${OrderResult.billing_address_id}`, {
              method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            // console.log('result',response);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("responsejson1 autoInvoices",result);
            
            if(result){
                //setData(result);
                fetchOrderAddressData(invoiceResult,OrderResult,result);
            };
          }catch(error){
           console.log('error',error);
          }
        }

      const fetchOrderData = async (invoiceResult) => {
        console.log('location',invoiceId)
          try{
            const token = localStorage.getItem('userToken');
            // console.log('token',token);
            const response = await fetch(`https://factory.teamasia.in/api/public/orders/${invoiceResult.order_id}`, {
              method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            // console.log('result',response);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("responsejson1 autoInvoices",result);
            
            if(result ){
                //setData(result);
                fetchOrderBillingAddressData(invoiceResult,result);
            };
          }catch(error){
           console.log('error',error);
          }
        }
        const fetchData = async () => {
        console.log('location',invoiceId)
          try{
            const token = localStorage.getItem('userToken');
            // console.log('token',token);
            const response = await fetch(`https://factory.teamasia.in/api/public/autoinvoices/${invoiceId}`, {
              method: 'GET', 
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            // console.log('result',response);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            console.log("responsejson1 autoInvoices",result);
            
            if(result ){
                //setData(result);
                fetchOrderData(result);
            };
          }catch(error){
           console.log('error',error);
          }
        }
        fetchData();
    },[]);

    return (
            // <button type="button" onClick={generatePDF}>
               <div className="fallback-spinner">
                  <div className="loading">
                     <Spinner color="primary" />
                  </div>
                </div>
            // </button>
    );
};

export default Invoice;