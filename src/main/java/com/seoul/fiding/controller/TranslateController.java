package com.seoul.fiding.controller;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/trip")
public class TranslateController {
	
	@GetMapping("/translate1")
    public String b(){
        return "main/sample0";
    }
	// Papago API 번역 메서드
	@PostMapping("/translate")
	@ResponseBody
    public Map<String, String> translate(String original) {
        String clientId = "emDQmfsxVO4mGq3VSHCK"; // 클라이언트 ID
        String clientSecret = "_kMkZf2cxM"; // 시크릿 키
        System.out.println(original); // 원본 텍스트 프린트
        
        // 원본 텍스트를 UTF-8로 인코딩
        String apiURL = "https://openapi.naver.com/v1/papago/n2mt"; 
        String text;
        try {
            text = URLEncoder.encode(original, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        
        // POST 요청으로 API 호출하고 응답 받기
        String translatedText = post(apiURL, requestHeaders, text);
        System.out.println("파파고: " +translatedText );

        // 응답 JSON 파싱
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(translatedText);
            // 번역 결과
            String translated = jsonNode.path("message").path("result").path("translatedText").asText();
            // System.out.println(translated);
            // 번역 결과를 Map에 담아 반환
            Map<String, String> response = new HashMap<>();
            response.put("translated", translated);
            return response;
        } catch (IOException e) {
            throw new RuntimeException("JSON 파싱 실패", e);
        }
    }
	// API 호출을 수행하는 메서드
    private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source=ko&target=en&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)

        try {
        	// POST 요청 설정
            con.setRequestMethod("POST");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }
            // 출력 스트림을 이용하여 POST 파라미터 전송
            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }
            // 응답 코드 확인 후 응답 읽어오기
            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
                return readBody(con.getInputStream());
            } else {  // 에러 응답
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }
    // API 연결 설정을 수행하는 메서드
    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }
    // 응답 바디를 읽어오는 메서드
    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

}
