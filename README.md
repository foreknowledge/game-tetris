# 테트리스

웹에서 즐길 수 있는 테트리스 게임 입니다.

https://ellie-play-tetris.netlify.app/ 에서 직접 플레이 해 보세요!

## 게임 방법

게임을 시작하면 위에서 테트리스 블럭이 일정한 속도로 떨어집니다. <br>
테트리스 블럭을 이동시켜 한 줄을 만들면 그 줄이 사라집니다. <br>
게임이 진행되는 동안 가능한 많은 줄을 완성해서 높은 점수를 얻는 게임입니다.

레벨 1 부터 시작해서 10개의 줄을 완성할 때마다 레벨이 1씩 증가합니다. <br>
레벨이 올라감에 따라 블럭이 내려오는 속도가 빨라지니 주의하세요!

### 조작법

- ⬅️/➡️ 방향키: 블럭을 좌/우로 이동합니다
- ⬆️ 방향키: 블럭을 오른쪽으로 90도 회전합니다
- `z` 또는 `Z`: 블럭을 왼쪽으로 90도 회전합니다
- ⬇️ 방향키: Soft drop (블럭을 한 칸 아래로 이동합니다)
- `스페이스바`: Hard drop (블럭을 바닥에 내려놓습니다)
- `ESC`: 게임 일시정지 / 다시시작

### 점수 시스템

- 줄 완성: 한 번에 완성한 줄이 많을 수록 높은 점수를 얻습니다
  - 1줄: 레벨 \* 100
  - 2줄: 레벨 \* 300
  - 3줄: 레벨 \* 500
  - 4줄: 레벨 \* 800
- Soft drop: 한 칸당 1점
- Hard drop: 한 칸당 2점

## 데모 영상

### 게임 시작, 일시정지, 도움말

<video src="https://user-images.githubusercontent.com/29790944/230858131-812a048e-eba1-4512-84ec-af6294f90593.mov" controls style="max-width: 600px;">
</video>

### 게임 오버

<video src="https://user-images.githubusercontent.com/29790944/230858198-bb84d00f-2548-4620-bc80-ede713924ae1.mov" controls style="max-width: 600px;">
</video>
