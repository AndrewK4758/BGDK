import type { SxProps } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';

interface GamesIconProps {
  sx: SxProps;
}

const GamesIcon = ({ sx }: GamesIconProps) => (
  <SvgIcon sx={sx}>
    <svg
      version="1.1"
      id="svg292"
      width="128"
      height="128"
      viewBox="0 0 128 128"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      xmlns-svg="http://www.w3.org/2000/svg"
    >
      <defs id="defs296" />
      <g id="g298">
        <image
          width="128"
          height="128"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAxXpUWHRSYXcgcHJvZmlsZSB0eXBl
IGV4aWYAAHjabVBRDsMgCP3nFDuCAiIex84u2Q12/GHBpW32Eh/IMw8E9s/7BY8JzAxcqkoTSQZu
3LBbosnRD86JD17AqF7q8BPQSmSRXFDxmFd9GUXM3bJyMtJnCNtVaBzt9WYUjWhONEcYYdTCiNCF
HAbdv5WkaT1/YdvTFeoHJmnNI8xcu9252vZGsT6EuFOmZEwk/obmYaBuSTNGEntoIx8VMS5UYxJb
yL89LcAXF1pZj9TGyEQAAAGEaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBzFX1tLVSoOFpTikKE6
2UVFHGsVilAh1AqtOphc+gVNGpIUF0fBteDgx2LVwcVZVwdXQRD8AHF2cFJ0kRL/lxRaxHhw3I93
9x537wB/s8pUsycBqJplZFJJIZdfFUKv6EMUQQQwLDFTnxPFNDzH1z18fL2L8yzvc3+OAaVgMsAn
ECeYbljEG8Qzm5bOeZ84wsqSQnxOPGHQBYkfuS67/Ma55LCfZ0aMbGaeOEIslLpY7mJWNlTiaeKY
omqU78+5rHDe4qxW66x9T/7CcEFbWeY6zVGksIgliBAgo44KqrAQp1UjxUSG9pMe/qjjF8klk6sC
Ro4F1KBCcvzgf/C7W7M4NekmhZNA8MW2P8aA0C7Qatj297Ftt06AwDNwpXX8tSYw+0l6o6PFjoDB
beDiuqPJe8DlDjDypEuG5EgBmv5iEXg/o2/KA0O3QP+a21t7H6cPQJa6St8AB4fAeImy1z3e3dvd
279n2v39AELjcpMqhtKiAAAOW2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJl
Z2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxu
czp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNC40LjAtRXhpdjIiPgogPHJk
ZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgt
bnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6eG1wTU09Imh0
dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25z
LmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6ZGM9Imh0
dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgeG1sbnM6R0lNUD0iaHR0cDovL3d3
dy5naW1wLm9yZy94bXAvIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZm
LzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgIHht
cE1NOkRvY3VtZW50SUQ9ImdpbXA6ZG9jaWQ6Z2ltcDpiMmQwMzFhZS01MDE3LTQ5ZDUtYmE4MS0z
MTc4ZDFjZTI1OTgiCiAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTFmNDljMTctNWRkNi00
NDllLWI1N2ItNGRkMzgwNWIzNmNiIgogICB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5k
aWQ6OThlMDhmNTAtYWY5ZC00NDRkLWJkZDAtOWVhNzEyYjZhODVlIgogICBkYzpGb3JtYXQ9Imlt
YWdlL3BuZyIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iTGludXgiCiAgIEdJ
TVA6VGltZVN0YW1wPSIxNzI3MzI3MjE5Mjc3OTE3IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzYi
CiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgog
ICB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0OjA5OjI2VDAxOjA2OjU3LTA0OjAwIgogICB4bXA6TW9k
aWZ5RGF0ZT0iMjAyNDowOToyNlQwMTowNjo1Ny0wNDowMCI+CiAgIDx4bXBNTTpIaXN0b3J5Pgog
ICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAg
ICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjYwYjlj
MWIyLTMxOGQtNDNjMC1iYzA1LTI5ZjdkMzEzYWY4MSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2Vu
dD0iR2ltcCAyLjEwIChMaW51eCkiCiAgICAgIHN0RXZ0OndoZW49IjIwMjQtMDktMjVUMTg6MDQ6
MzUtMDQ6MDAiLz4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAg
IHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OGJlODZi
ZTktZGYzYi00NDkxLTk1MTgtNTM4NGFlOTJiNjJmIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50
PSJHaW1wIDIuMTAgKExpbnV4KSIKICAgICAgc3RFdnQ6d2hlbj0iMjAyNC0wOS0yNlQwMTowNjo1
OS0wNDowMCIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgPC9yZGY6RGVz
Y3JpcHRpb24+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg
ICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz4i3BnuAAAA
BmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAADsOAAA7DgHMtqGDAAAAB3RJTUUH6AkaBQY75e1qjAAA
EVJJREFUeNrt3U1y4kgQBlBE6FQEG07ujcPXYhYTnnYzGAQqqSoz34voVfuvSlLllyUB02Fjp/Pl
egAAXvL1+TFt+fM3+eGKPgCMHQaa/UBFHwDihIHVP0ThB4B4QeDtb1b4ASBuEHjrmxR/AIgdAl7+
BsUfAOKHgMVfrPADQJ4gsOiLFH8AyBUCnn6B4g8A+ULApPgDQL0QcDQ9AFDPpPsHgHq7AJPiDwD1
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
AABJRU5ErkJggg==
"
          id="image300"
        />
      </g>
    </svg>
  </SvgIcon>
);

export default GamesIcon;
