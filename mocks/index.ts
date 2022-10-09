export async function initMocks() {
    if (typeof window === 'undefined') {
      const { server } = await import('./server')
      console.log('[server]:')
      server.listen()
    } else {
      const { worker } = await import('./browser')
      console.log('[client]:')
      worker.start()
    }
  }
  
  // require vs import
  // require 실행 하는 순간 파일 안의 코드 실행하는 듯
  // 브라우저 새로고침시 initMock의 server쪽 코드 왜 실행?
  // 노드 서버 , 환경에 대한 이해가 부족하다