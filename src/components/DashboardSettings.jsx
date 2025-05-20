import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"


const DashboardSettings = ({ widgets, onUpdateWidgets }) => {
  const [availableWidgets, setAvailableWidgets] = useState([
    { id: 'weather-card', name: 'Current Weather', enabled: true },
    { id: 'forecast-chart', name: '5-Day Forecast', enabled: true },
    { id: 'hourly-forecast', name: 'Hourly Forecast', enabled: true },
    { id: 'air-quality', name: 'Air Quality', enabled: true },
    { id: 'uv-index', name: 'UV Index', enabled: true },
    { id: 'sun-progress', name: 'Sun Position', enabled: true },
    { id: 'pollen-forecast', name: 'Pollen Forecast', enabled: false },
    { id: 'farming-advisory', name: 'Farming Advisory', enabled: false },
    { id: 'extreme-alerts', name: 'Extreme Alerts', enabled: true },
    { id: 'weather-globe', name: '3D Weather Globe', enabled: false },
    { id: 'ai-insights', name: 'AI Insights', enabled: true }
  ]);

  useEffect(() => {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      setAvailableWidgets(JSON.parse(savedWidgets));
    }
  }, []);

  const toggleWidget = (id) => {
    const updatedWidgets = availableWidgets.map(widget => 
      widget.id === id ? { ...widget, enabled: !widget.enabled } : widget
    );
    setAvailableWidgets(updatedWidgets);
    localStorage.setItem('dashboardWidgets', JSON.stringify(updatedWidgets));
    onUpdateWidgets(updatedWidgets.filter(w => w.enabled).map(w => w.id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(availableWidgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setAvailableWidgets(items);
    localStorage.setItem('dashboardWidgets', JSON.stringify(items));
    onUpdateWidgets(items.filter(w => w.enabled).map(w => w.id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Dashboard Customization
      </h2>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="widgets">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="space-y-3"
            >
              {availableWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div {...provided.dragHandleProps} className="mr-3 cursor-move">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        </div>
                        <span className="text-gray-800 dark:text-white">{widget.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={widget.enabled}
                          onChange={() => toggleWidget(widget.id)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Drag and drop to reorder widgets. Toggle switches to show/hide widgets on your dashboard.
        </p>
      </div>
    </div>
  );
};

export default DashboardSettings;