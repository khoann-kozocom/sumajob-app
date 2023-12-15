import React from "react";
import Svg, { Defs, Image, Path, Pattern, Use } from "react-native-svg";

export function AccountIcon(props) {
  return (
    <Svg
      width={28}
      height={26}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Path fill="url(#account)" d="M0 0H27.1116V26H0z" />
      <Defs>
        <Pattern
          id="account"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use
            xlinkHref="#image0_224_170"
            transform="matrix(.0039 0 0 .00407 0 -.021)"
          />
        </Pattern>
        <Image
          id="image0_224_170"
          width={256}
          height={256}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAADjBJREFUeF7t3W2S27YSQFFqZYlXFntldlamFKc0KXnssfDRbALE0Z+85wGaxAX6EgAp6rb5XJLA/X7/+9Gw9//+9dTQ93/72PYfT//w7+N/v/3b7XZ7/tslma3YqNuKjb5imx8Jvyf2nuifJXhv03cJ7GL4QQi9KMeoTwBj9EP1WTxd4f85MOFfndebEG6329dXBf19TAIEMGa//PasBkn6z4iRwURj6f1UCWCCTnsk/plX+lpK3ywTapGdU54AzuFedNQJE/9ju3YR7BuIlghFPZ5fiADymb884gUS/3dt/EYEL7s+vQABpCP//IAXTfznBpPAQOPtbXY22Pksezr3+32fJu/r/BU+RDBILxPAyR2xwFX/T4S/eJ7g3AFIACfyX+yq/xlps4ETxyABnAT/fr9/P/EBnpNa/elhSeCkHiGAZPCPKf+e/D6/EiCC5FFBAInATfmLYJNAEaaYQgQQw/FlFMn/EtFzARKowtVemADa2RXXlPzFqEigCVV7JQJoZ1dUU/IXYXKHoAtTe2UCaGf3sqbkf4mopIDlQAmlxjIE0AjuVTXJ/4pQ1d9JoApXeWECKGdVXFLyF6OqKUgCNbQKyxJAIajSYu7zl5JqKufR4SZsn1cigGCg9/v9HhxSuCcCt9vNmA0cEWAGwjT1D4T5eaj9haRfUo60wEEIIKiTJX8QyLIw9gPKOL0sRQAvEb0uYN3/mtEBJewHBEAlgACI1v0BEOtDWArUM/ulBgF0QjT17wTYV91SoI+fV4J18ttc/XsJ9tV3V6CTX1/1tWu7+g/R/5YCHd1gCdAIT/I3gjummg3BRq4E0AiOABrBHVPNLKCRKwE0gJP8DdCOr2IW0MCYABqgEUADtOOrmAU0MCaABmh2/hug5VQxC6jkTACVwFz9K4HlFjcLqORNAJXAXP0rgSUX91xAHXACqODl6l8B67yilgEV7AmgAhYBVMA6r6hlQAV7AqiAZfpfAevEopYB5fAJoJCVq38hqDGKWQYU9gMBFIIigEJQYxSzDCjsBwIoBGX6XwhqkGKWAWUdQQAFnLzxpwDSeEUsAwr6hAAKIJn+F0AarwgBFPQJARRAIoACSOMVsQ9Q0CcEUADJ+r8A0nhFCKCgTwigABIBFEAasIiNwNedQgAvGNkAfD2IBi5hH+BF5xAAAQycv92nRgAE0DeIbAD28Tu5tteGE0DfECSAPn4n17YRSAB9Q/B+v3/ftu3vvihqn0SAAAigb+gRQB+/k2sTAAH0DUEC6ON3cm0CIIC+IUgAffxOrk0ABNA3BAmgj9/JtQmAAPqGIAH08Tu5NgEQQN8QJIA+fifXJgAC6BuCBNDH7+TaBEAAfUOQAPr4nVybAAigbwgSQB+/k2sTAAH0DUGPAvfxO7m27wIQQN8Q9HXgPn4n1yYAAugbggTQx+/k2r4OTAB9Q5AA+vidWdsbgV7T90KQ14w2rwQrgDRgEQJ43SkE8JrRLgBfCS7gNFgRdwAKOoQACiARQAGk8YrYACzoEwIogGQfoADSeEUIoKBPCKAAEgEUQBqsiPV/WYcQQBkn+wCFnEYpRgBlPUEAZZwIoJDTIMVM/ws7ggAKQVkGFIIaoxgBFPYDARSC2ot5HqAC1olFTf/L4RNAOSvLgApWJxZ19a+ATwAVsCwDKmCdV9Tz/xXsCaAC1mMZ4KnASmaZxU3/62gTQB2vfRmw/0rQLgGf8QiY/lf2CQFUArMZ2AAsqYqrfz1oAqhnts8Cvm7b9k9DVVWOI+Dq38CWABqgWQY0QDu4iqt/G2ACaOPmlmAjt4Oqufo3giWARnD2AjrABVd19W8HSgDt7OwFdLALrOrq3wGTADrgPWYBngvoZNhT3dW/h962EUAfP88FdPLrrO7q3wmQADoBmgUEAGwLIfnbuP1UiwACIJJAEMSKMKb+FbD+UJQAYjhaCgRxLAzj6l8I6lUxAnhFqOLvnhCsgNVeVPK3s/ulJgEEwrQUCIb5azjJH4yYAIKBksABQB8hrfvj2RJAPFP7AQcw3bbNiz4O4EoAB0B9zAK8NyCOreSPY/lTJAI4CCwJhIG17g9D+WsgAjgQ7kMC3h3Qzljyt7MrqkkARZj6Crk92MTPtL8JW10lAqjj1VzaS0Sq0En+KlzthQmgnV11zYcE9leJ7RuEPr8S+LFt2z7t3//rk0CAABIgfzyEJcFvof+43W5fTuiOpQ9JACd1Pwn8BN5m30njkABOAr8f1r7AZsp/4vjbD00AJ3fAQwQr3io05R9g7BHAAJ3wJIG/FtggdNUfZMyZAQzUEe+ncvG9Abf3BhtzZgCDdchFRWCTb9BxRgCDdswFRGCqP/jYsgSYoIM+iGCGPQKJP9G4MgOYqLMGlsFb0r9dUTzFN9WIIoCpuuvnk308R7A/VnzGzGBP+n+3bdtv53l0d9JxRACTdtzvTvtJCPufI3++/D3BJfyFxos9gIt15h+ksP/p4xeQ9lnD82dP7vfP/1d0V/drDxIzgGv3r9Yh8EcCBGCAILAwAQJYuPM1HQECMAYQWJgAASzc+ZqOAAEYAwgsTIAAFu58TUeAAIwBBBYmQAALd76mI0AAxgACCxMggIU7X9MRIABjAIGFCRDAwp2v6QgQgDGAwMIECGDhztd0BAjAGEBgYQIEsHDnazoCBGAMILAwAQIYrPMf7/Xbz+rjK7zez/Tjq7wGa8Hb6Ty/Xmz//14xNmIv+XHQ83rlwws8z3ir73mNfxKC14mf2Q1+HTiN/oFv7E1rQ8KB/L5AAuTnQ1gCHAj88UOf+xEiX9F94BkPF9qvDB3cJQQQDPjpSi/pY9mSQSzPt2gEEAT14j/rHUQpJMzbLxLdbrevIdEWD0IAnQNA4ncC7Ku+/x6hnybrYEgAjfAkfiO4Y6pZHjRyJYBKcBK/Elhu8X028CX3kHMfjQAK+0/iF4Iao9g3ewRlHUEALzg9dvX3Hf3PnswrI61UNgHLggLiBPAHSK76BSNo/CJmA3/oIwL4DZzHVf/7+GPbGRYSMBv4BBQBfADjql+YUnMWMxv40G8E8ARE8s+Z1ZVn7U7BEzAC2LbNlL8yheYvbknw6MPlBSD558/mjhZ8ud1u/7+roCPOtFWXFoAp/7TjNvLEl94XWFYAkj8yh6aPtawElhSA5J8+YY9owJISWE4Akv+I3LlMzOUksJQAJP9lEvXIhiwlgWUEIPmPzJnLxV5GAksIwK2+yyVoRoOWuEV4eQFI/oxcuewxLi+BFQSwf6nHV3kvm6PHNux2u106Ry7duPv9LvmPzY8Vol96P+CyArDpt0JuprXxshK4pACs+9MSY6UDXXI/4KoCMPVfKTWT2nrF/YDLCcDUPykb1jzM5ZYClxKAqf+aWZnc6ktJ4GoCMPVPzoYFD3epNwpdRgCm/gum4nlNvsws4EoCuJ83Hhx5NQJX2RC8hAA88LNa+g3R3kvMAqYXgI2/IZJhyZO4wizgCgKw8bdk+g3R6OlnAVMLwNV/iCRY+iRmnwXMLgBX/6XTb4jGTz0LmF0Adv6HyIG1T2LmWcC0AnDff+2kG6z1084CZhaA6f9gWbDy6cw6C5hSADb/Vk61Yds+5SxgVgG4+g+bB8ueGAFkdf39frf5lwXbcYoJzLgMmG4GYPpfPB4VzCcw3SxgRgGY/ucPbEcsI0AAZZzaS5n+t7NT83gCsy0DppoBmP4fP4AdoZvAVC8PnU0AX7dt+6e7iwRA4DgCUy0DZhOA9f9xA1fkGAJTvTJsNgG4/RczSEU5kMBM+wDTCMD6/8ARK3Q0gWn2AWYSgPV/9DAV7ygC0+wDzCQA6/+jhqu40QQIIJqoF39GExXvQALTbATONAOwAXjgiBU6lsAsG4EEENvvoiHwRoAAAgeCOwCBMIXKIjDFnYApZgAEkDVmHSeQwBQbgbMIwC3AwJEpVAoBAojC7AWgUSTFSSRAAFGwCSCKpDiJBAggCjYBRJEUJ5EAAUTB9hBQFElxEgkQQBRsAogiKU4igSmeBpzlLoDvASSOXIcKIUAAIRi3bTMDiCIpTiIBAoiCTQBRJMVJJEAAUbAJIIqkOIkECCAKNgFEkRQnkQABRMEmgCiS4iQSIIAo2AQQRVKcRAIEEAWbAKJIipNIgACiYBNAFElxEgkQQBRsAogiKU4iAQKIgk0AUSTFSSRAAFGwCSCKpDiJBAggCjYBRJEUJ5EAAUTBJoAokuIkEiCAKNgEEEVSnEQCBBAFmwCiSIqTSIAAomATQBRJcRIJEEAUbAKIIilOIgECiIJNAFEkxUkkQABRsAkgiqQ4iQQIIAo2AUSRFCeRAAFEwSaAKJLiJBIggCjYBBBFUpxEAgQQBZsAokiKk0iAAKJgE0AUSXESCRBAFGwCiCIpTiIBAoiCTQBRJMVJJEAAUbAJIIqkOIkECCAKNgFEkRQnkQABRMEmgCiS4iQSIIAo2AQQRVKcRAIEEAWbAKJIipNIgACiYBNAFElxEgkQQBRsAogiKU4iAQKIgk0AUSTFSSRAAFGwCSCKpDiJBAggCjYBRJEUJ5EAAUTBJoAokuIkEiCAKNgEEEVSnEQCBBAFmwCiSIqTSIAAomATQBRJcRIJEEAUbAKIIilOIgECiIJNAFEkxUkkQABRsAkgiqQ4iQQIIAo2AUSRFCeRAAFEwSaAKJLiJBIggCjYBBBFUpxEAgQQBZsAokiKk0iAAKJgE0AUSXESCRBAFGwCiCIpTiIBAoiCTQBRJMVJJEAAUbAJIIqkOIkECCAKNgFEkRQnkQABRMEmgCiS4iQSIIAo2AQQRVKcRAIEEAWbAKJIipNIgACiYBNAFElxEgkQQBRsAogiKU4iAQKIgk0AUSTFSSQwhQD+A4erpj0o0uh+AAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
}

AccountIcon.propTypes = {};