package com.example.wbdvsp2102yizhuorenserverjava.services;

import com.example.wbdvsp2102yizhuorenserverjava.models.Widget;
import com.example.wbdvsp2102yizhuorenserverjava.repositories.WidgetRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WidgetService {

  @Autowired
  WidgetRepository repository;

  public List<Widget> findAllWidgets() {
    return (List<Widget>) repository.findAll();

  }

  public List<Widget> findWidgetsForTopic(String tid) {

    return repository.findWidgetsForTopic(tid);
  }

  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);

    return repository.save(widget);
  }

  public int deleteWidget(String wid) {
    repository.deleteById(Long.valueOf(wid));
    return 1;
  }

  public int updateWidget(String wid, Widget widget) {
      Widget originalWidget = repository.findById(Long.valueOf(wid)).get();
      if (widget.getText() != null) {
      originalWidget.setText(widget.getText());}
      if (widget.getTopicId() != null) {
      originalWidget.setTopicId(widget.getTopicId());}
      if (widget.getCssClass() != null) {
      originalWidget.setCssClass(widget.getCssClass());}
      if (widget.getHeight() != null) {
        originalWidget.setHeight(widget.getHeight());
      }
      if (widget.getWidth() != null) {
        originalWidget.setWidth(widget.getWidth());
      }
      if (widget.getName() != null) {
        originalWidget.setName(widget.getName());
      }
      if (widget.getSize() != null) {
        originalWidget.setSize(widget.getSize());
      }
      if (widget.getSrc() != null) {
        originalWidget.setSrc(widget.getSrc());
      }
      if (widget.getStyle() != null) {
        originalWidget.setStyle(widget.getStyle());
      }
      if (widget.getType() != null) {
        originalWidget.setType(widget.getType());
      }
      if (widget.getValue() != null) {
        originalWidget.setValue(widget.getValue());
      }
      if (widget.getOrdered() != null) {
        originalWidget.setOrdered(widget.getOrdered());
      }
      repository.save(originalWidget);
      return 1;
  }
}
