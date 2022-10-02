import type { NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>셀프 코드리뷰 체크리스트</title>
      </Head>

      <main>
        <h1 css={{ margin: "40px" }}>셀프 코드리뷰 체크리스트</h1>
        <ul>
          <CheckItem
            title={
              "var 는 절대 쓰지 말고, 바뀌지 않는 변수면 let 대신 반드시 const를 써야한다."
            }
            contents={[
              code("var [user] = useUser(); // ❌"),
              code("let [user] = useUser(); // ❌"),
              code("const [user] = useUser(); // ✅"),
            ].join("\n")}
          />
          <CheckItem
            title={
              "함수명, 변수명, 클래스명, 컴포넌트명, 상수변수명, 타입/인터페이스명 컨벤션은 잘 지켰는지 확인한다."
            }
            contents={[
              code("const [user, setUser] = useState<User>(DEFAULT_USER);"),
              code("<User />"),
            ].join("\n")}
          />
          <CheckItem
            title={
              "불필요한 로그나 의미 불명의 주석은 없는 지 확인한다. (console.log, 주석, 낙서 등등)"
            }
            contents={[
              code("console.log('test');"),
              code("// 이거 이따가 PR올리기 전에 고쳐야지"),
              code(
                "// const code = someCode(); [주석처리한 이유가 적혀있지 않은 코드 주석]"
              ),
            ].join("\n")}
          />
          <CheckItem
            title={
              "안티패턴 `변수명: string | undefined;` 은 없는 지 확인한다."
            }
            contents={[
              "undefined 에 대한 타입 정의는 다음과 같이 한다.",
              code("변수명?: string;"),
            ].join("\n")}
          />
          <CheckItem
            title={"반환값이 필요 없는 함수 호출에서는 반환값을 쓰지 말자."}
            contents={[
              "아래처럼 오류가 난다면 throw new Error가 되어 res status를 확인할 필요가 없다.",
              "-------------------------------------------------------------------------------------",
              code(
                "const res = await handlePatchComment(commentId, commentContent);"
              ),
              code(" "),
              code("if (res.status === 200) {"),
              code("  router.reload();"),
              code("}"),
              "-------------------------------------------------------------------------------------",
              "따라서 위 코드는 아래처럼 바꿀 수 있다.",
              "-------------------------------------------------------------------------------------",
              code("await handlePatchComment(commentId, commentContent);"),
              code("router.reload();"),
              "-------------------------------------------------------------------------------------",
            ].join("\n")}
          />
        </ul>
      </main>
    </div>
  );
};

export default Home;

function code(str: string) {
  return `<code>${str}</code>`;
}

const CheckItem = ({
  title,
  contents,
}: {
  title?: ReactNode;
  contents?: string;
}) => {
  return (
    <li style={{ listStyle: "none", marginBottom: "40px" }}>
      <details
        open
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        <summary
          style={{ fontSize: "20px", cursor: "pointer" }}
        >{`  ${title}`}</summary>
        <ul
          style={{
            marginTop: "10px",
            background: "#f0f0f0",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {(contents ?? "").split("\n").map((x: string, i: number) => {
            if (x.startsWith("<code>") && x.endsWith("</code>")) {
              return (
                <li
                  key={i}
                  style={{
                    lineHeight: "120%",
                    margin: "10px 0",
                  }}
                >
                  <code
                    style={{
                      background: "#f0f0f0",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {x.replace("<code>", "").replace("</code>", "")}
                  </code>
                </li>
              );
            }
            return (
              <li
                key={i}
                style={{
                  lineHeight: "120%",
                  margin: "10px 0",
                }}
              >
                {x}
              </li>
            );
          })}
        </ul>
      </details>
    </li>
  );
};
