import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Optional;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;


public class ConferenceGet extends HttpServlet {

  private final Gson gson = new Gson();
  private static final String DATA_FILE = "/WEB-INF/conferences.json";

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    BufferedReader reader = request.getReader();
    JsonObject requestBody = JsonParser.parseReader(reader).getAsJsonObject();
    
    if (!requestBody.has("id")) {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "The JSON request must contain an 'id' field.");
      return;
    }
    
    int id = requestBody.get("id").getAsInt();

    List<Conference> conferencesList = getConferenceContent();
    
    Optional<Conference> matchingConference = conferencesList.stream()
      .filter(conference -> conference.getId() == id)
      .findFirst();

    if (matchingConference.isPresent()) {
      String conferenceJson = gson.toJson(matchingConference.get());
      response.setContentType("application/json");
      response.setCharacterEncoding("UTF-8");
      response.getWriter().write(conferenceJson);
    } else {
      response.sendError(HttpServletResponse.SC_NOT_FOUND, "Conference with ID " + id + " not found.");
    }
  }

  private List<Conference> getConferenceContent() throws IOException {
    try (FileReader reader = new FileReader(getServletContext().getRealPath(DATA_FILE))) {
      Type listType = new TypeToken<List<Conference>>(){}.getType();
      return gson.fromJson(reader, listType);
    }
  }

  public static class Conference {
    private int id;
    private String name;
    private String date;
    private String time;
    
    public int getId() {
        return id;
    }
  }
}